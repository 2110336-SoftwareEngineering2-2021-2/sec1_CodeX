import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { datapipelines } from 'googleapis/build/src/apis/datapipelines';
import { Model } from 'mongoose';
import { Schedule } from '../schedule/schedule.interface';
import { User } from '../user/user.interface';
import { uploadImage } from '../util/google';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.interface';
import { LearnSchedule } from '../LearnSchedule/learnSchedule.interface';
import { LearnScheduleDto ,Slot} from '../LearnSchedule/learnSchedule.dto';
import { domainToASCII } from 'url';
import { UserDto } from '../user/user.dto';
const mongoose = require('mongoose');
@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<Booking>,
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('LearnSchedule') private learnScheduleModel: Model<LearnSchedule>
  ) {}

  GetProfileByMail(mail: String) {
    return this.bookingModel.find({ email: mail }).exec();
  }

  async createBooking(dto: BookingDto): Promise<any> {
    dto.timeStamp = new Date();
    //calculate total price
    var totalSlot = 0;

    const tutor = await this.userModel.findOne({
      schedule_id: { $in: dto.schedule_id },
    });
    if (!tutor)
      throw new NotFoundException({ success: false, data: 'Tutor not found' });
    const student = await this.userModel.findById(dto.student_id);
    if (!student)
      throw new NotFoundException({ success: false, data: 'User not found' });

    let price = tutor.pricePerSlot;

    dto.days.forEach((element) => {
      totalSlot += element.slots.length;
    });

    dto.totalPrice = totalSlot * Number(price);

    try {
      const booking = await this.bookingModel.create(dto);
      if (!booking)
        throw new BadRequestException({
          success: false,
          data: 'cannot create the booking',
        });
      //add data to student
      dto.days.forEach(async (element) => {
        let schedule = await this.scheduleModel.findByIdAndUpdate(
          dto.schedule_id,
          {
            $push: {
              'days.$[elem].slots.$[index].students': {
                id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
              },
            },
          },
          {
            arrayFilters: [
              { 'elem.day': element.day },
              { 'index.slot': { $in: element.slots } },
            ],
            new: true,
          }
        );
      });
      return { success: true, data: booking };
    } catch (err) {
      throw new BadRequestException({ success: false, data: err });
    }
  }

  getByDay(days : any,target : String){
    
    for (let i=0;i<days.length;i++){
      if (days[i].day == target){
        return { slot : days[i].slots, idx : i }
      }
    }
    return null
  }

  private getBySlot(slots : any,target:Number){
    console.log("GeyBySlot",slots,target)
    for (let i=0;i<slots.length;i++){
      if (slots[i].slot == target){
        return { data : slots[i]._id , idx : i}
        /*{ data : { subject : slots[i].subject , description : slots[i].description  
          ,tutorId : tutor._id ,tutorName : tutor.firstName , tutorLastName : tutor.lastName , members : null,
          zoomId : tutor.zoomId} , idx : i}*/
      }
    }
    return null
  }

  private getApprovedStudents(students){
    var re = []
    for (let s of students){
      if (s.status == "Approved")
      re.push({firstName : s.firstName, lastName : s.lastName})
    }
    return re

  }

  public async updateLearnSchedule(booking : BookingDto){
      var studentId_ = booking.student_id
      var schedule = await this.scheduleModel.findById(mongoose.Types.ObjectId(booking.schedule_id))
      var startDate_ = schedule.startDate
      var result = await this.learnScheduleModel.findOne({
         studentId: studentId_ ,
         startDate : startDate_
      })
      var thatTutor = await this.userModel.findOne({
        schedule_id : booking.schedule_id
      })
      //console.log(thatTutor)
      console.log("result",result)
      if (result == null){
        //create new LearnSchedule
        let data = new LearnScheduleDto
        let tmpDays = Array()
        data.startDate = startDate_
        data.studentId = studentId_
        //for each day in booking
        for (let i=0;i<booking.days.length;i++){
          let day_ = booking.days[i].day
          tmpDays.push({day:day_ , slots:[]})
          let slots = booking.days[i].slots
          let thatDay = this.getByDay(schedule.days,day_).slot
          console.log("thatDay",thatDay)
          console.log("slots",slots)
          //for each slot in that day
          for (var idx of slots){
            var slotId = this.getBySlot(thatDay,idx)
            //just in case that slot is not in shcedule
            if (slotId==null) continue
            //create new slot
            var tmp = {slot:null,data:null}
            tmp.slot = idx
            //has only one subject for sure in this booking
            tmp.data = [{slotId : slotId.data}]
            console.log(tmp)

            //append in slots of that day
            tmpDays[i].slots.push(tmp)
          }
        }
        data.days = tmpDays
        var re = await this.learnScheduleModel.create(data)
        .then((res)=>{
          return res
        })
        .catch((err)=>{
          throw new BadRequestException({ success: false, data: err })
        })
        return { success: true, data:re};
      }
      else{
        //update existed learn schedule
        let oldData : any = result
        for (let i=0;i<booking.days.length;i++){
          let day_ = booking.days[i].day
          let tmp = this.getByDay(oldData.days,day_)
          let thatDay = this.getByDay(schedule.days,day_).slot
          let slots = booking.days[i].slots
          //create new day
          if (tmp==null){
            console.log("That day is not already existed",tmp)
            let newDay = {day:day_ , slots:[]}
            
            console.log("thatDay",thatDay)
            console.log("slots",slots)
            
            for (let idx of slots){
              console.log(idx)
              let slotId = this.getBySlot(thatDay,idx)
              if (slotId==null) continue
              var tmp2 = {slot:null,data:null}
              tmp2.slot = idx
              tmp2.data = [{slotId : slotId.data}]
              console.log("tmp2",tmp2)
              newDay.slots.push(tmp2)
            }
            oldData.days.push(newDay)
            console.log("new",oldData)
          }
          //update existed day
          else{
            //index of existed day in array
            let id = tmp.idx
            let oldDay = oldData.days[id].slots
            for (let idx of slots){
              let slotId = this.getBySlot(thatDay,idx)
              if (slotId==null) continue
              var tmp1 = {slot:null,data:null}
              tmp1.slot = idx
              tmp1.data = [{slotId : slotId.data}]
              let oldSlot = this.getBySlot(oldDay,idx)
              console.log("tmp",idx,tmp1,oldSlot,day_)
              if (oldSlot == null){
                //create new slot , use tmp1 as list
                oldData.days[id].slots.push(tmp1)
                console.log("new slot",oldData.days[i].slots[0])
              }
              else{
                //update that oldSlot , use one data in tmp1
                oldData.days[id].slots[oldSlot.idx].dataSlots.push(tmp1.data[0])
                console.log("update slot",tmp1.data,oldData.days[id].slots[oldSlot.idx].data)
              }
            }
          }
        }
        console.log(result)
        var ret = await this.learnScheduleModel.replaceOne(
          {_id:result._id} 
          , result)
          .then((res)=>{
            return res
          })
          .catch((err)=>{
            throw new BadRequestException({ success: false, data: err })
          })
        console.log("result",result)
        return { success: true, data: ret };
      }
     
      


  }

  

  //Get booking of the tutor
  async getBookingTutor(id: String) {
    //Find tutor
    const tutor = await this.userModel.findById(id);
    if (!tutor) {
      throw new NotFoundException({
        success: false,
        message: 'Tutor not found',
      });
    }

    //Get the bookings
    var bookingTutor = [];
    for (var i = 0; i < 4; i++) {
      const booking = await this.bookingModel
        .find(
          { schedule_id: mongoose.Types.ObjectId(tutor.schedule_id[i]) },
          { __v: 0 }
        )
        .exec();
      bookingTutor = [...bookingTutor, ...booking];
    }

    var ordering = {},
      sortOrder = ['Pending', 'Approved', 'Reject', 'Cancelled'];
    for (var i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
    bookingTutor.sort(function (a, b) {
      return (
        ordering[a.status] - ordering[b.status] ||
        Number(a.timeStamp > b.timeStamp) - Number(a.timeStamp < b.timeStamp)
      );
    });

    return { success: true, data: bookingTutor };
  }

}

