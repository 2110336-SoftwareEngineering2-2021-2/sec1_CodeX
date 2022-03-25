import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly subjects: { type: [String]; default: undefined };
  studiedWith: { type: [String]; default: [] };
  @ApiProperty()
  readonly description: { type: [String]; default: undefined };
  readonly schedule: { type: Object; default: undefined };

  totalRating: number;
  numReviews: number;
  @ApiProperty()
  readonly firstName: String;

  @ApiProperty()
  readonly lastName: String;

  @ApiProperty()
  readonly phoneNumber: String;

  @ApiProperty()
  readonly email: String;

  @ApiProperty()
  readonly birthDate: Date;

  @ApiProperty()
  readonly address: String;

  @ApiProperty()
  readonly citizenID: String;
  role: String;
  readonly zoomID: String;
  readonly zoomStartURL: String;
  readonly zoomJoinURL: String;
  profileImg: {
    url: String;
  };
  readonly schedule_id: [String];

  @ApiProperty()
  readonly pricePerSlot: { type: Number; default: 0 };
}

export class NewUserDto {
  @ApiProperty()
  firstName: String;

  @ApiProperty()
  lastName: String;

  @ApiProperty()
  phoneNumber: String;

  @ApiProperty()
  email: String;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  address: String;

  @ApiProperty()
  citizenID: String;
}
