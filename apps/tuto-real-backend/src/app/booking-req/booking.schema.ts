import * as mongoose from 'mongoose';
import { TimePeriodDto } from '../util/timePeriod.dto';

export const BookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  timeStamp: Date,
  tutorMail: String,
  status: String,
  timePeriod: [TimePeriodDto],
});
