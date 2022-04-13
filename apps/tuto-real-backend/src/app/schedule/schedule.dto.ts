import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';

export class Student_Schedule {
  @ApiProperty({
    type: String,
    enum: ['Approved', 'Pending'],
    default: 'Pending',
  })
  status: String;

  @ApiProperty({ type: String })
  id: String;

  @ApiProperty({ type: String })
  firstName: String;

  @ApiProperty({ type: String })
  lastName: String;
}

export class Slots_Schedule {
  @ApiProperty({ type: Number })
  slot: Number;

  @ApiProperty({ type: String })
  subject: String;

  @ApiProperty({ type: String })
  description: String;

  @ApiProperty({ type: [Student_Schedule], default: [] })
  students: [Student_Schedule];
}

export class Days_Schedule {
  @ApiProperty({ type: String })
  day: String;

  @ApiProperty({ type: [Slots_Schedule] })
  slots: [Slots_Schedule];
}

export class ScheduleDto {
  @ApiProperty({ type: Date })
  startDate: Date;

  @ApiProperty({ type: [Days_Schedule] })
  days: Days_Schedule[];
}
