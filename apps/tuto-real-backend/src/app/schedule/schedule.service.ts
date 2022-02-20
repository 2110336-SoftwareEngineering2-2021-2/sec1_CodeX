import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ideahub_v1beta } from 'googleapis';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.interface';
import { UpdateScheduleDto } from './updateSchedule.dto';

const mongoose = require('mongoose');

const getStartDate = (startDate: Date): Date => {
    const dateNoTimeZone = startDate
    dateNoTimeZone.setDate(dateNoTimeZone.getDate() + 7)
    return dateNoTimeZone
} 

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
    @InjectModel('User') private userModel: Model<User>
  ) {}

    public async getSchedule(id: string): Promise<any> {
        if(id) {
            const user = await this.userModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
            if(!user) return {success: false, data: "User not found"}
            const scheduleIdList = user.schedule_id
            if(!scheduleIdList) return {success: false, data: "This user has no schedules"}
            const scheduleList = []
            for(const scheduleId of scheduleIdList) {
                const schedule = await this.scheduleModel.findById({ _id: mongoose.Types.ObjectId(scheduleId) }).exec()
                if(schedule?.startDate && getStartDate(new Date(schedule?.startDate)) < new Date()) {
                    // If schedule is outdated -> delete it //
                    // await this.deleteSchedule(scheduleId)
                }
                if(schedule?.days) {
                    const setOfSubject = new Set<String>()
                    schedule.days.forEach(day => {
                        if(day.slots) {
                            day.slots.forEach(block => {
                                if(block?.subject) setOfSubject.add(block.subject)
                            })
                        }
                    })
                    scheduleList.push({...schedule.toObject(), allSubjects: [...setOfSubject]})
                }
            }
          });
          scheduleList.push({
            ...schedule.toObject(),
            allSubjects: [...setOfSubject],
          });
        }
      }
      return { success: true, data: scheduleList };
    }
    return { success: false, data: 'Invalid user id' };
  }

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
    //update schedule
    try {
      const schedule_check = await this.scheduleModel.findById(
        mongoose.Types.ObjectId(id)
      );
      if (!schedule_check)
        return { success: false, data: 'cannot find a schedule' };

      const schedule = await this.scheduleModel
        .updateOne(
          { _id: mongoose.Types.ObjectId(id) },
          { pricePerSlot: dto.pricePerSlot, days: dto.days },
          { upsert: true }
        )
        .exec();
      if (!schedule) {
        return { success: false, message: 'fail to update' };
      }

      //get all subject in a new schedule
      const subjects_schedule = await this.scheduleModel.distinct(
        'days.slots.subject',
        { _id: mongoose.Types.ObjectId(id) }
      );

      const tutor = await this.userModel.findOne({ schedule_id: { $in: id } });

      await this.userModel
        .updateOne(
          { _id: tutor._id },
          { $set: { subjects: subjects_schedule } },
          { upsert: true }
        )
        .exec();

      const schedule_return = await this.scheduleModel.findById(
        mongoose.Types.ObjectId(id)
      );
      return { success: true, data: schedule_return };
    } catch (err) {
      return { success: false, data: err.message };
    }
  }

  public async deleteSchedule(id: string) {
    const schedule_check = await this.scheduleModel.findById(
      mongoose.Types.ObjectId(id)
    );
    if (!schedule_check)
      throw new NotFoundException({ success: false, data: 'mos' });

    //get tutor information
    const tutor = await this.userModel.findOne({ schedule_id: { $in: id } });
    const schedule_id = await this.userModel.distinct('schedule_id', {
      _id: tutor._id,
    });

    const schedule = await this.scheduleModel.findByIdAndDelete(
      mongoose.Types.ObjectId(id)
    );

    if (!schedule) {
      return { success: false, data: 'cannot delete the schedule' };
    }

    var subjects_user = [];
    const schedules = tutor.schedule_id;
    for (var i = 0; i < schedules.length; i++) {
      const subjects = await this.scheduleModel.distinct('days.slots.subject', {
        _id: mongoose.Types.ObjectId(schedules[i]),
      });
      subjects_user = [...new Set([...subjects_user, ...subjects])];
      console.log(schedules[i], subjects_user);
    }

    schedule_id.splice(schedule_id.indexOf(id), 1);
    const result = await this.userModel
      .findOneAndUpdate(
        { _id: tutor._id },
        {
          $set: {
            subjects: subjects_user,
            schedule_id: schedule_id,
          },
        }
      )
      .exec();

    return { success: true, data: {} };
  }
}
