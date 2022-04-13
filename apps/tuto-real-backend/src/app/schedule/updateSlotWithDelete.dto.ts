import { ApiProperty } from '@nestjs/swagger';

export class Days_Delete {
  @ApiProperty({ type: String })
  day: String;

  @ApiProperty({ type: [Number] })
  slots: [Number];
}

export class UpdateSlotWithDeleteDto {
  @ApiProperty({ type: [Days_Delete] })
  days: [Days_Delete];
}
