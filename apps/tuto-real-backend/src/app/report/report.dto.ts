import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  @ApiProperty({ required: true })
  createdAt: Date;

  @ApiProperty({ required: true })
  text: string;

  @ApiProperty({ required: true })
  reporterId: string;

  @ApiProperty({ required: true })
  targetId: string;

  @ApiProperty({ required: true })
  status: string;

  @ApiProperty()
  imageUrl: String;
}

export class CreateReportDto {
  @ApiProperty({ required: true })
  text: string;

  @ApiProperty({ required: true })
  reporterId: string;

  @ApiProperty({ required: true })
  targetId: string;

  @ApiProperty()
  reportImg: string;
}

export class UpdateReportDto {
  @ApiProperty({ required: true })
  isBan: boolean;
}
