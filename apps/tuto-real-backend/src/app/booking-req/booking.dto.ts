import { TimePeriodDto } from '../util/timePeriod.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EncodeIntoResult } from 'util';

export class DayData {
  @ApiProperty({ type: String })
  day: String;

  @ApiProperty({ type: [Number] })
  slots: [Number];
}

export class BookingDto {
  @ApiProperty({ type: String })
  student_id: String;

  @ApiProperty({ type: String })
  schedule_id: String;

  @ApiProperty({ type: [DayData] })
  readonly days: [DayData];

  //@ApiProperty({ type: Date, default: new Date() })
  timeStamp: Date;

  //@ApiProperty({ type: Number, required: false })
  totalPrice: Number;

  //@ApiProperty({ type: String, default: 'Pending', required: false })
  status: String;
}

export class UpdateBookingDto {
  @ApiProperty({ type: String })
  status: String;
}
