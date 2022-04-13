import { ApiProperty } from '@nestjs/swagger';

export class Slots_Update {
  @ApiProperty({ type: Number })
  slot: Number;

  @ApiProperty({ type: String })
  subject: String;

  @ApiProperty({ type: String })
  description: String;
}

export class Days_Update {
  @ApiProperty({ type: String })
  day: String;

  @ApiProperty({ type: [Slots_Update] })
  slots: [Slots_Update];
}

export class UpdateScheduleDto {
  @ApiProperty({ type: [Days_Update] })
  days: [Days_Update];
}
