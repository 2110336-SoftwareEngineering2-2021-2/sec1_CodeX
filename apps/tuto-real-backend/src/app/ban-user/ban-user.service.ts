import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo, Mongoose } from 'mongoose';
import { ReportService } from '../report/report.service';
import { User } from '../user/user.interface';

const mongoose = require('mongoose');

@Injectable()
export class BanUserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly reportService: ReportService
  ) {}

  public async getBannedUser(): Promise<any> {
    const bannedUser = await this.userModel.find({ isBan: true });
    return { success: true, data: bannedUser };
  }

  public async banUser(
    tid: String,
    duration: Number,
    rid: String
  ): Promise<any> {
    if (!duration)
      throw new BadRequestException({
        success: false,
        data: 'Please provide ban duration',
      });

    //Find user
    const user = await this.userModel.findById(tid).exec();
    if (!user)
      throw new NotFoundException({
        success: false,
        message: 'User is not found',
      });

    //If the user has not been already banned
    if (!user.isBan) {
      let date = new Date(Date.now());
      date.setHours((date.getHours() as number) + (duration as number));
      await this.userModel.updateOne(
        { _id: mongoose.Types.ObjectId(tid) },
        { isBan: true, unbanDate: date },
        { new: true }
      );
    }
    //If the user has already been banned
    else {
      let date = user.unbanDate;
      date.setHours(date.getHours() + (duration as number));
      await this.userModel.updateOne(
        { _id: mongoose.Types.ObjectId(tid) },
        { unbanDate: date },
        { new: true }
      );
    }

    const user_new = await this.userModel
      .findById(
        { _id: tid },
        { firstName: 1, lastName: 1, isBan: 1, unbanDate: 1 }
      )
      .exec();

    //Handle report
    const Rid = rid as string;
    this.reportService.updateReportStatus(Rid, true);

    return { success: true, data: user_new };
  }

  public async unBanUser(tid: String): Promise<any> {
    await this.userModel
      .findByIdAndUpdate(tid, { isBan: false, unbanDate: null }, { new: true })
      .catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });

    const user_new = await this.userModel
      .findById(
        { _id: tid },
        { firstName: 1, lastName: 1, isBan: 1, unbanDate: 1 }
      )
      .exec();

    return { success: true, data: user_new };
  }
}
