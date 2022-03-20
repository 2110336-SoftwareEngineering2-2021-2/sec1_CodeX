import * as mongoose from 'mongoose';
import { TimePeriodDto } from '../util/timePeriod.dto';

export const BookingSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  schedule_id: { type: String, required: true },
  days: [{ _id: false, day: String, slots: [Number] }],
  timeStamp: Date,
  totalPrice: Number,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Reject', 'Cancelled'],
    default: 'Pending',
  },
});

BookingSchema.path('student_id').required(true);
BookingSchema.path('schedule_id').required(true);
