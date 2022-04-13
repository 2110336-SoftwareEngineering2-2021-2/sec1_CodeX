import { ApiProperty } from '@nestjs/swagger';

export class updateUserDto {
  @ApiProperty()
  readonly subjects: [String];

  @ApiProperty()
  readonly description: String;

  @ApiProperty()
  readonly firstName: String;

  @ApiProperty()
  readonly lastName: String;

  @ApiProperty()
  readonly birthDate: Date;

  @ApiProperty()
  readonly address: String;

  @ApiProperty()
  profileImg: {
    url: String;
  };

  @ApiProperty()
  profile64: String;

  @ApiProperty()
  readonly schedule_id: [String];

  @ApiProperty()
  readonly pricePerSlot: Number;
}
