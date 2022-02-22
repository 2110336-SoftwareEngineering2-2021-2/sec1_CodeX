import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ideahub_v1beta } from 'googleapis';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { Model } from 'mongoose';
import { TutorReqModule } from '../tutor-req/tutor-req.module';
import { User } from '../user/user.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.interface';
import { UpdateScheduleDto } from './updateSchedule.dto';
import { UpdateSlotWithDeleteDto } from './updateSlotWithDelete.dto';

const mongoose = require('mongoose');

const getFinalDate = (startDate: Date): Date => {
  // get final date of that week
  const dateNoTimeZone = startDate;
  dateNoTimeZone.setDate(dateNoTimeZone.getDate() + 7);
  return dateNoTimeZone;
};

const getPreviousSunday = () => {
  const previousSunday = new Date();
  previousSunday.setHours(7, 0, 0, 0);
  previousSunday.setDate(previousSunday.getDate() - previousSunday.getDay());
  return previousSunday;
};

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    @InjectModel('User') private userModel: Model<User>
  ) {}

  public async getSchedule(id: string): Promise<any> {
    if (id) {
      const user = await this.userModel
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .exec();
      if (!user) return { success: false, data: 'User not found' };
      const scheduleIdList: String[] = user.schedule_id;
      if (!scheduleIdList)
        return { success: false, data: 'This user has no schedules' };

      const scheduleList = [];
      const startDateList: Date[] = [];
      for (let i = 0; i < 4; i++) {
        if (i < scheduleIdList.length) {
          const schedule = await this.scheduleModel
            .findById({ _id: mongoose.Types.ObjectId(scheduleIdList[i]) })
            .exec();
          if (schedule?.startDate) {
            // Check if the schedule is outdated or not //
            if (getFinalDate(new Date(schedule?.startDate)) < new Date()) {
              // await this.deleteSchedule(scheduleIdList[i])
            } else {
              const allSubjects = await this.scheduleModel.distinct(
                'days.slots.subject',
                { _id: scheduleIdList[i] }
              );
              startDateList.push(schedule.startDate);
              scheduleList.push({ ...schedule.toObject(), allSubjects });
            }
          }
        } else break;
      }

      // If amount of schedule is not equal to 4 (1 month) -> add more until that tutor has 4 schedule //
      if (startDateList.length < 4) {
        const schedule = await this.scheduleModel
          .findById({ _id: mongoose.Types.ObjectId(scheduleIdList[0]) })
          .exec();
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
      return { success: true, data: scheduleList };
    }
    return { success: false, data: 'Invalid user id' };
  }

  public async createSchedule(id: string, dto: ScheduleDto): Promise<any> {
    try {
      //add data to collection schedule
      const schedule = await this.scheduleModel.create(dto);
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
        if (subjects_user.includes(element)) {
        } else {
          subjects_user.push(element);
        }
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
      return { success: false, data: err.message };
    }
  }

  public async deleteSchedule(id: string) {
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
    const schedule_id = await this.userModel.distinct('schedule_id', {
      _id: tutor._id,
    });

    const schedule = await this.scheduleModel.findByIdAndDelete(
      mongoose.Types.ObjectId(id)
    );

    if (!schedule) {
      return { success: false, data: 'cannot delete the schedule' };
    }

    var subjects_user = [];
    const schedules = tutor.schedule_id;
    for (var i = 0; i < schedules.length; i++) {
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
        let daySlot = [];
        days[idx].slots.forEach((element) => {
          daySlot.push(element.slot);
        });
        e.slots.forEach(async (element) => {
          var index = daySlot.indexOf(element.slot);
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
    return { success: true, data: schedule.days };
  }
}
