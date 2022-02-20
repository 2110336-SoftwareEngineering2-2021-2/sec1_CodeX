import {HttpException,Injectable,UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ideahub_v1beta } from 'googleapis';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import { ScheduleDto } from './schedule.dto';
import { Schedule } from './schedule.interface';

const mongoose = require('mongoose');
@Injectable()
export class ScheduleService {                                                                                     
    constructor(
        @InjectModel('Schedule') private scheduleModel: Model<Schedule>,
        @InjectModel('User') private userModel: Model<User>
      ){}

    public async getSchedule(id: string): Promise<any> {
        if(id) {
            const user = await this.userModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
            if(!user) return {success: false, data: "User not found"}
            const scheduleIdList = user.schedule_id
            if(!scheduleIdList) return {success: false, data: "This user has no schedules"}
            const scheduleList = []
            for(const scheduleId of scheduleIdList) {
                const schedule = await this.scheduleModel.findById({ _id: mongoose.Types.ObjectId(scheduleId) }).exec()
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
            return {success: true, data: scheduleList}
        }
        return {success: false, data: "Invalid user id"}
    }
    
    public async createSchedule(id: string, dto: ScheduleDto): Promise<any>{
        try {
            //add data to collection schedule
            const schedule = await this.scheduleModel.create(dto);
            //add schedule id to user collection(schedule_id)
            await this.userModel.updateOne(
                { _id: id },
                { $push:{schedule_id: schedule._id} },
                { upsert: true },
            ).exec();
            //add subject to user collection
            const subjects_user = await this.userModel.distinct("subjects",{_id:id});
            const subjects_schedule = await this.scheduleModel.distinct("days.slots.subject",{_id: schedule._id})
            subjects_schedule.forEach(element => {
                if(subjects_user.includes(element)){}
                else{
                    subjects_user.push(element)
                }
            });
            await this.userModel.updateOne(
                {_id: id},
                { $set: {subjects: subjects_user}},
                { upsert: true },
            ).exec();
           return {success: true, data: schedule};
        } catch(err){
            return {success:false, data: err.message};
        }
    }
}
