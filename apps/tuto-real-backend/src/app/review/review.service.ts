import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReviewDto } from './createReview.dto';
import { Review } from './review.interface';
import { updateReviewDto } from './updateReview.dto';
import * as mongoose from 'mongoose';
import { ReviewDto } from './review.dto';
import { User } from '../user/user.interface';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}

  public async createReview(dto: createReviewDto): Promise<any> {
    const user = await this.userModel.findById(dto.writerID);
    if (!user.studiedWith.includes(dto.tutorID))
      throw new BadRequestException({
        success: false,
        data: 'User cannot review to this tutor',
      });

    const existReview = await this.reviewModel
      .findOne({
        tutor: dto.tutorID,
        writer: dto.writerID,
      })
      .exec();

    if (existReview)
      throw new BadRequestException({
        success: false,
        data: 'User has already reviewed to this tutor',
      });

    const time = new Date().toLocaleString();
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
    const time = new Date().toLocaleString();
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

  async getReviews(tutorId: string, sortBy: string, sid: string) {
    var id;
    if (sortBy == undefined) {
      sortBy = 'createdAt';
    } else if (!['lastUpdated', 'rating', 'createdAt'].includes(sortBy)) {
      throw new BadRequestException({
        success: false,
        data: 'Wrong sortBy value',
      });
    }
    try {
      id = new mongoose.Types.ObjectId(tutorId);
    } catch {
      throw new BadRequestException({
        success: false,
        data: 'Wrong tutorId format',
      });
    }
    var re_ = await this.reviewModel
      .aggregate([
        {
          $match: { tutor: id },
        },
        {
          $addFields: {
            writer: { $toString: '$writer' },
            tutor: { $toString: '$tutor' },
          },
        },
        {
          $sort: { [sortBy]: -1 },
        },
      ])
      .catch((err) => {
        throw new InternalServerErrorException({ success: false, data: err });
      });
    var rating = null;
    var tutor = await this.userModel
      .findOne({ _id: new mongoose.Types.ObjectId(tutorId) })
      .exec()
      .catch((err) => {
        throw new NotFoundException({ success: false, data: err });
      });
    if (tutor == null)
      throw new NotFoundException({ success: false, data: 'Tutor not found' });
    if (tutor.role != 'Tutor')
      throw new BadRequestException({ success: false, data: 'Not a tutor' });
    if (tutor.totalRating != undefined)
      rating = tutor.totalRating / tutor.numReviews;
    var self = null;
    var allow = false;
    //if can not review
    var studiedWith = await this.userModel.find({
      $and: [
        { _id: new mongoose.Types.ObjectId(sid) },
        { studiedWith: tutorId },
      ],
    });
    if (studiedWith.length != 0) allow = true;
    var re = [];
    for (let i = 0; i < re_.length; i++) {
      if (sid != undefined && re_[i].writer == sid) {
        self = re_[i];
      } else re.push(re_[i]);
    }
    if (sid == tutorId) allow = false;
    return {
      success: true,
      data: { rating: rating, allow: allow, self: self, reviews: re },
    };
  }
}
