import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ type: Number, required: true })
  duration: Number;

  @ApiProperty({ type: String, required: true })
  reportId: String;
}
