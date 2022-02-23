import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { deleteImg, uploadImage, uploadImageBy64 } from '../util/google';
import { updateUserDto } from './updateUser.dto';
import { UserDto } from './user.dto';
import { User } from './user.interface';
const mongoose = require('mongoose');

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async getProfile(id: String, email: String): Promise<any> {
    let profile;
    if (id) {
      profile = await this.userModel
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .exec();
    } else if (email) {
      profile = await this.userModel.findOne({ email }).exec();
    }

    if (!profile)
      throw new NotFoundException({ success: false, data: 'User not found' });

    return { success: true, data: profile };
  }

  public async createProfile(dto: UserDto): Promise<any> {
    const profile = await this.userModel.create(dto);

    if (!profile)
      throw new BadRequestException({
        success: false,
        data: 'Create not success',
      });

    return { success: true, data: profile };
  }

  public async updateProfile(id: String, dto: updateUserDto): Promise<any> {
    const profile = await this.userModel.findById(id).exec();
    if (!profile)
      throw new NotFoundException({
        success: false,
        data: 'User not found',
      });

    let url = profile.profileImg.url;
    let pricePerSlot = dto.pricePerSlot
      ? dto.pricePerSlot
      : profile.pricePerSlot;

    if (dto.profile64) {
      //if prev img is not default, delete it
      if (url.split('Profile/')[1] != 'default.jpg') {
        await deleteImg(url.split('Profile/')[1], 'Profile');
      }
      url = await uploadImageBy64('Profile', dto.profile64);
    }

    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          subjects: dto.subjects,
          description: dto.description,
          firstName: dto.firstName,
          lastName: dto.lastName,
          address: dto.address,
          birthDate: dto.birthDate,
          profileImg: { url },
          pricePerSlot,
        },
        { new: true }
      )
      .exec();

    if (!user)
      throw new NotFoundException({ success: false, data: 'User not found' });

    return { success: true, data: user };
  }
}
