import { TimePeriodDto } from '../util/timePeriod.dto';

export class BookingDto {
  readonly student_id: { type: String; required: true };
  readonly schedule_id: { type: String; required: true };
  readonly days: [{ _id: false; day: String; slots: [Number] }];
  readonly timeStamp: Date;
  readonly totalPrice: Number;
  status: { type: String; enum: ['Pending', 'Approved']; default: 'Pending' };
}
