import { ApiProperty } from "@nestjs/swagger";

export class ReportDto {
    @ApiProperty({required:true})
    createdAt: Date;

    @ApiProperty({required:true})
    text : string;

    @ApiProperty({required:true})
    reporter_id : string;

    @ApiProperty({required:true})
    target_id : string;

    @ApiProperty({required:true})
    status : string;

    @ApiProperty()
    imageUrl : String
  }
  
export class CreateReportDto{
  @ApiProperty({required:true})
  text : string;

  @ApiProperty({required:true})
  reporter_id : string;

  @ApiProperty({required:true})
  target_id : string;

  @ApiProperty()
  image64 : string
}

  
export class UpdateReportDto{
  
  @ApiProperty({required:true})
  isBan : boolean;
}