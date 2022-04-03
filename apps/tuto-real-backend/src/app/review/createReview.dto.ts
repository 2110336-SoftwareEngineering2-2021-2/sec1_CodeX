import { ApiProperty } from "@nestjs/swagger";
import { ReviewDto } from "./review.dto";

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

export class getReviewQuery{
  @ApiProperty({required: true})
  _id: string;

  @ApiProperty({required: false})
  sortBy: string;

  @ApiProperty({required: false})
  sid: string
}

export class getReviewsDto{
  rating : number;
  allow : boolean;
  self : ReviewDto;
  reviews : ReviewDto[]


}