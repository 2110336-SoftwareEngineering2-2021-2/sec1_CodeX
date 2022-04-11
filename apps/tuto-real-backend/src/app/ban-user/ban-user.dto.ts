import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ type: Date, required: true })
  unBanDate: Date;
}
