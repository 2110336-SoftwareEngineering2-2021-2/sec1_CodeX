import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ type: Number, required: true })
  duration: Number;
}
