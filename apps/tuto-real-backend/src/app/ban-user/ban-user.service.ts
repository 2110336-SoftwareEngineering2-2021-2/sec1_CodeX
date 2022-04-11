import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';

@Injectable()
export class BanUserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  public async getBannedUser(): Promise<any> {
    const bannedUser = await this.userModel.find({ isBan: true });
    return { success: true, data: bannedUser };
  }

  public async banUser(tid: String, unBanDate: Date): Promise<any> {
    if (!unBanDate)
      throw new BadRequestException({
        success: false,
        data: 'Please provide unBanDate',
      });
    const user = await this.userModel
      .findByIdAndUpdate(tid, { isBan: true, unBanDate }, { new: true })
      .catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });
    return { success: true, data: user };
  }

  public async unBanUser(tid: String): Promise<any> {
    const user = await this.userModel
      .findByIdAndUpdate(tid, { isBan: false, unBanDate: null }, { new: true })
      .catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });
    return { success: true, data: user };
  }
}
