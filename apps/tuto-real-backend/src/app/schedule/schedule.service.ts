import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ideahub_v1beta } from 'googleapis';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { Model } from 'mongoose';
import { last } from 'rxjs';
import { setFlagsFromString } from 'v8';
import { LearnScheduleDto } from '../LearnSchedule/learnSchedule.dto';
import { LearnSchedule } from '../LearnSchedule/learnSchedule.interface';
import { TutorReqModule } from '../tutor-req/tutor-req.module';
import { User } from '../user/user.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.interface';
import { UpdateScheduleDto } from './updateSchedule.dto';
import { UpdateSlotWithDeleteDto } from './updateSlotWithDelete.dto';
import { max, previousDay, startOfWeek } from 'date-fns'
const mongoose = require('mongoose');

const getFinalDate = (startDate: Date): Date => {
  // get final date of that week
  const dateNoTimeZone = startDate;
  dateNoTimeZone.setDate(dateNoTimeZone.getDate() + 7);
  return dateNoTimeZone;
};

function nextweek(today){
  today.setHours(7,0,0)
  console.log(today.getDate())
  var next = new Date(today.getFullYear(), today.getUTCMonth(), today.getUTCDate()+7);
  //next.setHours(0,0,0)
  console.log(next.getDate())
  console.log(next)
  return next;
}

const getPreviousSunday = () => {
  /*
    "console.log" gives UTC+0
    "compare" and do everything else with UTC+7 (Depend on local time)
    time from "Database" is UTC+0
  */
  const previousSunday = new Date();
  previousSunday.setHours(7, 0, 0, 0);
  previousSunday.setDate(previousSunday.getDate() - previousSunday.getDay());
  return previousSunday;
};

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('LearnSchedule') private learnScheduleModel: Model<LearnSchedule>,
  ) {}

  public async getSchedule(id: string): Promise<any> {
    if (id) {
      const user: User = await this.userModel
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .exec();
      if (!user)
        throw new NotFoundException({ success: false, data: 'User not found' });
      const scheduleIdList: String[] = user.schedule_id;
      if (!scheduleIdList)
        throw new NotFoundException({
          success: false,
          data: 'This user has no schedules',
        });

      const scheduleList = [];
      const startDateList: Date[] = [];
      let num = 0,
        i = 0; // Amount of schedule that we already got
      while (num < 4 && i < scheduleIdList.length) {
        const schedule = await this.scheduleModel
          .findById({ _id: mongoose.Types.ObjectId(scheduleIdList[i]) })
          .exec();
        if (schedule?.startDate) {
          // Check if the schedule is outdated or not //
          if (getFinalDate(new Date(schedule?.startDate)) < new Date()) {
            await this.deleteSchedule(scheduleIdList[i]);
          } else {
            const allSubjects = await this.scheduleModel.distinct(
              'days.slots.subject',
              { _id: scheduleIdList[i] }
            );
            startDateList.push(schedule.startDate);
            scheduleList.push({ ...schedule.toObject(), allSubjects });
          }
          num++;
          i++;
        } else {
          // If schedule is not found -> delete that schedule id from user's schedule_id list //
          await this.userModel
            .updateOne(
              { _id: id },
              { $pull: { schedule_id: scheduleIdList[i] } }
            )
            .exec();
          i++;
        }
      }

      // If amount of schedule is not equal to 4 (1 month) -> add more until that tutor has 4 schedule //
      if (startDateList.length < 4) {
        startDateList.sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );
        const sunday = new Date(getPreviousSunday());
        let idx = 0;
        for (let i = 0; i < 4; i++) {
          if (
            idx >= startDateList.length ||
            new Date(startDateList[idx]).getDate() !== sunday.getDate()
          ) {
            const emptySchedule = {
              startDate: new Date(sunday),
              days: [],
            };
            const newSchedule: { success: boolean; data: Schedule } =
              await this.createSchedule(id, emptySchedule);
            if (newSchedule.success)
              scheduleList.push({
                ...newSchedule.data.toObject(),
                allSubjects: [],
              });
          } else idx++;
          sunday.setDate(sunday.getDate() + 7); // Go to next sunday
        }
      }
      scheduleList.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
      return {
        success: true,
        data: { pricePerSlot: user.pricePerSlot, scheduleList },
      };
    }
    throw new NotFoundException({ success: false, data: 'Invalid user id' });
  }

  public async createSchedule(id: string, dto: ScheduleDto): Promise<any> {
    try {
      //add data to collection schedule
      const schedule = await this.scheduleModel.create(dto);
      if (!schedule)
        throw new BadRequestException({
          success: false,
          data: 'cannot create the schedule',
        });
      //add schedule id to user collection(schedule_id)
      await this.userModel
        .updateOne(
          { _id: id },
          { $push: { schedule_id: schedule._id } },
          { upsert: true }
        )
        .exec();
      //add subject to user collection
      const subjects_user = await this.userModel.distinct('subjects', {
        _id: id,
      });
      const subjects_schedule = await this.scheduleModel.distinct(
        'days.slots.subject',
        { _id: schedule._id }
      );
      subjects_schedule.forEach((element) => {
        if (!subjects_user.includes(element)) 
          subjects_user.push(element);
      });
      await this.userModel
        .updateOne(
          { _id: id },
          { $set: { subjects: subjects_user } },
          { upsert: true }
        )
        .exec();
      return { success: true, data: schedule };
    } catch (err) {
      throw new BadRequestException({ success: false, data: err.message });
    }
  }

  public async deleteSchedule(id: String) {
    const schedule_check = await this.scheduleModel.findById(
      mongoose.Types.ObjectId(id)
    );
    if (!schedule_check)
      throw new NotFoundException({
        success: false,
        data: 'not found the schedule',
      });

    //get tutor information
    const tutor = await this.userModel.findOne({ schedule_id: { $in: id } });
    if (!tutor)
      throw new NotFoundException({ success: false, data: 'Tutor not found' });
    const schedule_id = await this.userModel.distinct('schedule_id', {
      _id: tutor._id,
    });

    const schedule = await this.scheduleModel.findByIdAndDelete(
      mongoose.Types.ObjectId(id)
    );

    if (!schedule) {
      throw new NotFoundException({
        success: false,
        data: 'Cannot delete the schedule',
      });
    }

    let subjects_user = [];
    const schedules = tutor.schedule_id;
    for (let i = 0; i < schedules.length; i++) {
      const subjects = await this.scheduleModel.distinct('days.slots.subject', {
        _id: mongoose.Types.ObjectId(schedules[i]),
      });
      subjects_user = [...new Set([...subjects_user, ...subjects])];
    }

    schedule_id.splice(schedule_id.indexOf(id), 1);
    const result = await this.userModel
      .findOneAndUpdate(
        { _id: tutor._id },
        {
          $set: {
            subjects: subjects_user,
            schedule_id: schedule_id,
          },
        }
      )
      .exec();
    if (!result)
      throw new NotFoundException({ success: false, data: 'cannot update' });

    return { success: true, data: {} };
  }

  public async updateSlotWithDelete(id: string, dto: UpdateSlotWithDeleteDto) {
    //everything is checked by frontend

    let schedule;
    dto.days.forEach(async (element) => {
      schedule = await this.scheduleModel
        .findByIdAndUpdate(
          mongoose.Types.ObjectId(id),
          {
            $pull: { 'days.$[elem].slots': { slot: { $in: element.slots } } },
          },
          {
            arrayFilters: [{ 'elem.day': element.day }],
            new: true,
          }
        )
        .exec();
    });

    const subjects = await this.scheduleModel.distinct('days.slots.subject', {
      _id: mongoose.Types.ObjectId(id),
    });

    const tutor = await this.userModel.findOneAndUpdate(
      { schedule_id: { $in: id } },
      { subjects },
      { new: true }
    );

    return { success: true, data: schedule.days };
  }

  public async updateSlotWithAdd(id: string, dto: UpdateScheduleDto) {
    //check valid slot

    const { days } = await this.scheduleModel
      .findById(mongoose.Types.ObjectId(id))
      .exec();
    if (!days)
      throw new NotFoundException({
        success: false,
        data: 'cannot find the schedule',
      });

    dto.days.forEach(async (e) => {
      const day = e.day;
      const idx = days.findIndex((x) => x.day == day);
      if (idx == -1) {
        await this.scheduleModel.findByIdAndUpdate(
          mongoose.Types.ObjectId(id),
          {
            $push: { days: e },
          },
          { new: true }
        );
      } else {
        const daySlot = [];
        days[idx].slots.forEach((element) => {
          daySlot.push(element.slot);
        });
        e.slots.forEach(async (element) => {
          const index = daySlot.indexOf(element.slot);
          if (index == -1) {
            await this.scheduleModel.findByIdAndUpdate(
              mongoose.Types.ObjectId(id),
              {
                $addToSet: { 'days.$[elem].slots': element },
              },
              { arrayFilters: [{ 'elem.day': e.day }], new: true }
            );
          } else {
            await this.scheduleModel.findByIdAndUpdate(
              mongoose.Types.ObjectId(id),
              {
                $set: { 'days.$[elem].slots.$[index]': element },
              },
              {
                arrayFilters: [
                  { 'elem.day': e.day },
                  { 'index.slot': element.slot },
                ],
                new: true,
              }
            );
          }
        });
      }
    });

    const subjects = await this.scheduleModel.distinct('days.slots.subject', {
      _id: mongoose.Types.ObjectId(id),
    });

    await this.userModel.findOneAndUpdate(
      { schedule_id: { $in: id } },
      { subjects },
      { new: true }
    );
    const schedule = await this.scheduleModel.findById(
      mongoose.Types.ObjectId(id)
    );
    if (!schedule)
      throw new NotFoundException({
        success: false,
        data: 'Schedule not found',
      });
    return { success: true, data: schedule.days };
  }


  async getLearnSchedules(studentId : string){
    //delte expired schedule
    var now = new Date()
    var expiredDate = new Date();
    expiredDate.setDate(now.getDate() - 7)
    expiredDate.setHours(0,0,0)
    console.log(expiredDate)
    await this.learnScheduleModel.deleteMany({startDate : {$lt:expiredDate}})
    .catch((err)=>{
      throw new BadRequestException({ success: false, data: 'Invalid studenID' });
    })
    var maxDate =  await this.learnScheduleModel.distinct("startDate",{"studentId":studentId})
    .catch((err)=>{
      throw new NotFoundException({ success: false, data: 'Invalid studenID' });
    })

    var latestDate = maxDate.length!=0? new Date(Math.max(...maxDate)): getPreviousSunday()
    console.log(latestDate)
        //insert advance schedule
    var more = 4 - maxDate.length
    
    
    console.log("latestDate",latestDate)
    for (let i=1;i<=more;i++){
      latestDate = nextweek(latestDate)
      console.log("add",latestDate)
      var add = new LearnScheduleDto()
      add.studentId = studentId
      add.startDate = latestDate
      await this.learnScheduleModel.create(add)
      .then((res)=>{console.log(res)})
      .catch((err)=>{
        throw new BadRequestException({ success: false, data: err });
      })
    }
    var raw : any = await this.learnScheduleModel.find({'studentId' : studentId}).sort({"startDate": 1}).lean()
    .then((res)=>{
      return res
    })
    .catch((err)=>{
      throw new NotFoundException({ success: false, data: 'Invalid studenID' });
    })
    //lastedtSunday
    console.log(latestDate)
    for (let i=0;i<raw.length;i++){
      var subjects = new Set()
      if (raw[i].startDate > latestDate) latestDate = raw[i].startDate
      for (var day of raw[i].days){
        for (var slot of day.slots){
          console.log("slot",slot)
          for(let j=0;j<slot.data.length;j++){
            console.log(slot.data[j].slotId)
            var re = await this.scheduleModel.findOne(
              { "days.slots._id": slot.data[j].slotId},
              { "days.slots.$": 1 , "_id":1})
            .catch((err)=>{
              throw new NotFoundException({ success: false, data: "referenced slot not found" });
            })
            console.log(re._id)

            var tutorInfo = await this.userModel.findOne(
              {"schedule_id" : re._id}
            )
            .catch((err)=>{
              throw new InternalServerErrorException({ success: false, data: err });
            })
            subjects.add(re.days[0].slots[0].subject)
            slot.data[j].subject = re.days[0].slots[0].subject
            slot.data[j].description = re.days[0].slots[0].description
            slot.data[j].tutorId = tutorInfo._id
            slot.data[j].tutorFirstName = tutorInfo.firstName
            slot.data[j].tutorLastName = tutorInfo.lastName
            slot.data[j].zoomURL = tutorInfo.zoomJoinURL
            slot.data[j].members = []
            let students : any= re.days[0].slots[0].students? re.days[0].slots[0].students:[]
            for (let k =0;k<students.length;k++){
              if (students[k].status == "Approved"){
                slot.data[j].members.push({
                  firstName : students[k].firstName,
                  lastName : students[k].lastName
                })
              }
            }
            console.log(slot.data[j])
          }
      }
      raw[i].subjects = Array.from(subjects)
      
    }

    
    return { success: true, data: raw };
  }
}
}
