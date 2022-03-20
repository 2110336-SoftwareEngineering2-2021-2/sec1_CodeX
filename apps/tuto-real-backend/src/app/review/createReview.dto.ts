import * as mongoose from 'mongoose';

export class createReviewDto {
  rating: number;
  comment: string;
  tutorID: string;
  writerID: string;
}
