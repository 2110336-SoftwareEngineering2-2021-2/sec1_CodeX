import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReviewDto } from './createReview.dto';
import { Review } from './review.interface';
import { updateReviewDto } from './updateReview.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>
  ) {}

  public async createReview(dto: createReviewDto): Promise<any> {
    const time = this.getDate();
    const data = {
      createdAt: time,
      lastUpdated: time,
      rating: dto.rating,
      comment: dto.comment,
      tutor: new mongoose.Types.ObjectId(dto.tutorID),
      writer: new mongoose.Types.ObjectId(dto.writerID),
    };

    const review = await (
      await (
        await this.reviewModel.create(data)
      ).populate({
        path: 'tutor',
        select: 'firstName lastName',
      })
    ).populate({
      path: 'writer',
      select: 'firstName lastName',
    });
    return { success: true, data: review };
  }

  public async updateReview(id: String, dto: updateReviewDto): Promise<any> {
    const time = this.getDate();
    const data = {
      lastUpdated: time,
      rating: dto.rating,
      comment: dto.comment,
    };
    const review = await this.reviewModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return { success: true, data: review };
  }

  private getDate(): String {
    const now = new Date().toLocaleString();
    return now;
  }
}
