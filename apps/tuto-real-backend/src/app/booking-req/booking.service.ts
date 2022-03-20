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

const mongoose = require('mongoose');
@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private bookingModel: Model<Booking>,
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    @InjectModel('User') private userModel: Model<User>
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
