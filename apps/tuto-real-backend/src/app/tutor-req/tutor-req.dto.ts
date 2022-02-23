import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { ProfileImg } from "../util/image.schema";

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
  citizenID: ProfileImg
   

  @ApiProperty()
  transcription: ProfileImg

  @ApiProperty()
  timeStamp: Date;

  @ApiProperty()
  citizenID64: String;

  @ApiProperty()
  transcription64: String;
}

export class CreateTutorReq extends PickType(TutorReqDto, ['email','citizenID64','transcription64'] as const) {}
export class ShowTutorReq extends OmitType(TutorReqDto,['citizenID64','transcription64'] as const){}