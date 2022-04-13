import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import { CriteriaDto } from './criteria.dto';
import { Schedule } from '../schedule/schedule.interface';

@Injectable()
export class TutorService {
  constructor(
    @InjectModel('User') private tutorModel: Model<User>,
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>
  ) {}

  public async getTutor(): Promise<any> {
    const tutors = this.tutorModel.find({ role: 'Tutor' }).exec();
    return tutors;
  }

  public async searchTutor(dto: CriteriaDto) {
    console.log(dto);
    var queryKeyword = [],
      queryDays = [];
    if (!!dto.keyword) {
      dto.keyword.forEach((word) => {
        if (word.length >= 3)
          queryKeyword.push({
            $or: [
              { description: { $regex: word, $options: 'i' } },
              { firstName: { $regex: word, $options: 'i' } },
              { lastName: { $regex: word, $options: 'i' } },
              {
                'schedules.days.slots.description': {
                  $regex: word,
                  $options: 'i',
                },
              },
            ],
          });
      });
    }
    if (!!dto.days) {
      var tmp;
      dto.days.forEach((day) => {
        tmp = 'schedules.days.day';
        queryDays.push({ [tmp]: day });
      });
    }

    return await this.tutorModel
      .aggregate([
        {
          $match: {
            $and: [
              !!dto.subjects ? { subjects: { $all: dto.subjects } } : {},
              !!dto.rate
                ? { pricePerSlot: { $gte: dto.rate.min, $lte: dto.rate.max } }
                : {},
              { schedule_id: { $exists: true } },
              { role: 'Tutor' },
            ],
          },
        },
        {
          $addFields: {
            schedule_id: {
              $map: {
                input: '$schedule_id',
                in: { $toObjectId: '$$this' },
              },
            },
          },
        },
        {
          $lookup: {
            from: 'schedules',
            localField: 'schedule_id',
            foreignField: '_id',
            as: 'schedules',
          },
        },
        {
          $match: {
            $and: [
              !!dto.days ? { $or: queryDays } : {},
              !!dto.keyword && queryKeyword.length != 0
                ? { $and: queryKeyword }
                : {},
            ],
          },
        },
        {
          $project: {
            price: '$pricePerSlot',
            firstName: 1,
            lastName: 1,
            profileImg: 1,
            subjects: 1,
            rating: '$avgRating',
          },
        },
        { $unset: 'schedules' },
      ])
      .then((res) => {
        res = res.sort((a, b) =>
          a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
        );
        return { success: true, data: res };
      })
      .catch((err) => {
        throw new BadRequestException({ success: false, data: err.message });
      });
  }
}
