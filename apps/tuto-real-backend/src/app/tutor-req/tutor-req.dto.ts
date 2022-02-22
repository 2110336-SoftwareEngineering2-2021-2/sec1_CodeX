import { ApiProperty } from "@nestjs/swagger";

export class TutorReqDto {
  @ApiProperty()
  
  _id : String
  @ApiProperty()
  firstName: String;

  @ApiProperty()
  lastName: String;

  @ApiProperty()
  readonly email: String;

  @ApiProperty()
  citizenID: {
    fileName: String;
    url: String;
  };

  @ApiProperty()
  transcription: {
    fileName: String;
    url: String;
  };

  @ApiProperty()
  timeStamp: Date;

  @ApiProperty()
  citizenID64: String;

  @ApiProperty()
  transcription64: String;
}
