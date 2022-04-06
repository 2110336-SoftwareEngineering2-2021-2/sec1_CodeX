import { ApiProperty } from '@nestjs/swagger';

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
