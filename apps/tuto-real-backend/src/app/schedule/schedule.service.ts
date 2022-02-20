import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ideahub_v1beta } from 'googleapis';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { Model } from 'mongoose';
import { Subject } from 'rxjs';
import { User } from '../user/user.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.interface';
import { UpdateScheduleDto } from './updateSchedule.dto';

const mongoose = require('mongoose');
@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    @InjectModel('User') private userModel: Model<User>
  ) {}

  public async createSchedule(id: string, dto: ScheduleDto): Promise<any> {
    try {
      //add data to collection schedule
      const schedule = await this.scheduleModel.create(dto);
      //add schedule id to user collection(schedule_id)
      await this.userModel
        .updateOne(
          { _id: id },
          { $push: { schedule_id: schedule._id } },
          { upsert: true }
        )
        .exec();
      //add subject to user collection
      const subjects_user = await this.userModel.distinct('subjects', {
        _id: id,
      });
      const subjects_schedule = await this.scheduleModel.distinct(
        'days.slots.subject',
        { _id: schedule._id }
      );
      subjects_schedule.forEach((element) => {
        if (subjects_user.includes(element)) {
        } else {
          subjects_user.push(element);
        }
      });
      await this.userModel
        .updateOne(
          { _id: id },
          { $set: { subjects: subjects_user } },
          { upsert: true }
        )
        .exec();
      return { success: true, data: schedule };
    } catch (err) {
      return { success: false, data: err.message };
    }
  }

  public async updateSchedule(
    id: string,
    dto: UpdateScheduleDto
  ): Promise<any> {
    try {
      const schedule = await this.scheduleModel
        .updateOne(
          { _id: mongoose.Types.ObjectId(id) },
          { pricePerSlot: dto.pricePerSlot, days: dto.days },
          { upsert: true }
        )
        .exec();
      if (!schedule) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      return { success: false, data: err.message };
    }
  }
}
