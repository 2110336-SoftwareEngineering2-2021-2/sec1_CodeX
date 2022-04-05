import { ApiProperty } from '@nestjs/swagger';

export class createReviewDto {
  @ApiProperty({ default: 0 })
  rating: number;

  @ApiProperty({ required: false })
  comment: string;

  @ApiProperty()
  tutorID: string;

  @ApiProperty()
  writerID: string;
}
