import {
  HttpException,
  Injectable,
  UnauthorizedException,
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

  public async getProfileByMail(email: String): Promise<any> {
    const profile = await this.userModel.findOne({ email }).exec();
    if (!profile) return { success: false, data: 'User not found!' };
    return { success: true, data: profile };
  }

  public async createProfile(dto: UserDto): Promise<any> {
    try {
      const profile = await this.userModel.create(dto);
      return { success: true, data: profile };
    } catch (err) {
      return { success: false, data: err.message };
    }
  }

  public async updateProfile(email: string, dto: updateUserDto): Promise<any> {
    if (dto.profile64 != null) {
      await this.userModel
        .find({ email })
        .exec()
        .then(async (result) => {
          //if prev img is not default, delete it
          console.log(result[0].profileImg.url.split('Profile/')[1]);
          if (result[0].profileImg.url.split('Profile/')[1] != 'default.jpg') {
            await deleteImg(
              result[0].profileImg.url.split('Profile/')[1],
              'Profile'
            );
          }
          await uploadImageBy64('Profile', dto.profile64).then((url) => {
            dto.profileImg = { url };
          });
        });
    }

    try {
      const profile = await this.userModel
        .findOneAndUpdate(
          { email },
          {
            subjects: dto.subjects,
            description: dto.description,
            firstName: dto.firstName,
            lastName: dto.lastName,
            address: dto.address,
            birthDate: dto.birthDate,
            profileImg: dto.profileImg,
          },
          { upsert: true }
        )
        .exec();
      return { success: true, data: profile };
    } catch (err) {
      return { success: false, data: err.message };
    }
  }
}
