import { ApiProperty } from '@nestjs/swagger';

export class updateReviewDto {
  @ApiProperty({ required: false })
  rating: number;

  @ApiProperty({ required: false })
  comment: string;
}
