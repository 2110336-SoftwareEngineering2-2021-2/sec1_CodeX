import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadImage } from '../util/google';
import { updateUserDto } from './updateUser.dto';
import { UserDto } from './user.dto';
import { User } from './user.interface';

const mongoose = require('mongoose');
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  GetProfileByMail(mail: String) {
    return this.userModel.find({ email: mail }).exec();
  }

    async Create(dto : UserDto){

        return this.userModel.create(dto);
    }

    async updateProfile(mail: string, dto: updateUserDto) {
        const userList = await this.userModel.find({ email: mail }).exec();
        await this.userModel.updateOne(
            { email: mail },
            { firstName: dto.firstName, lastName: dto.lastName, address: dto.address, birthDate: dto.birthDate, profileImg: dto.profileImg},
            { upsert: true },
        ).exec();
    }
}
