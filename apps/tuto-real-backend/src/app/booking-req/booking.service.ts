import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadImage } from '../util/google';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.interface';

const mongoose = require('mongoose');
@Injectable()
export class BookingService {
  constructor(@InjectModel('Booking') private bookingModel: Model<Booking>) {}

  GetProfileByMail(mail: String) {
    return this.bookingModel.find({ email: mail }).exec();
  }

  async Create(dto: BookingDto) {
    return this.bookingModel.create(dto);
  }
}
