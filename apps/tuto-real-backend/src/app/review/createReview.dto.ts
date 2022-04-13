import { ApiProperty } from "@nestjs/swagger";


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

export class ReviewDto {
  @ApiProperty({required: true})
  createdAt: Date;

  @ApiProperty({required: true})
  lastUpdated: Date;

  @ApiProperty({required: true})
  rating: Number;

  @ApiProperty({required: true})
  comment: string;

  @ApiProperty({required: true})
  tutor: string;

  @ApiProperty({required: true})
  writer: string;
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
  @ApiProperty({required: true})
  rating : number;

  @ApiProperty({required: true})
  allow : boolean;

  @ApiProperty({required: true})
  self : ReviewDto;

  @ApiProperty({required: true})
  reviews : ReviewDto[]


}

