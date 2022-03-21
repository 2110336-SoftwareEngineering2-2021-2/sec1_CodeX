import { TimePeriodDto } from '../util/timePeriod.dto';

export class BookingDto {
  student_id: String;
  readonly schedule_id: String; 
  readonly days: [{ _id: false; day: String; slots: [Number] }];
  timeStamp: Date;
  totalPrice: Number;
  status: { type: String; enum: ['Pending', 'Approved']; default: 'Pending' };
}
