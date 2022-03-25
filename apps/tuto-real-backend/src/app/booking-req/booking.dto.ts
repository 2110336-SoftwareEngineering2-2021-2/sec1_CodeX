import { TimePeriodDto } from '../util/timePeriod.dto';

export class BookingDto {
  student_id: String;
  schedule_id: String;
  readonly days: [{ _id: false; day: String; slots: [Number] }];
  timeStamp: Date;
  totalPrice: Number;
  status: String;
}
