import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadImage, uploadImageBy64 } from '../util/google';
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

  async Create(dto: UserDto) {
    return this.userModel.create(dto);
  }

  async updateProfile(mail: string, dto: updateUserDto) {
        await uploadImageBy64("Profile",dto.profile64)
        .then((url)=>{
          dto.profileImg = {url: url}
        })
        const userList = await this.userModel.find({ email: mail }).exec();
        await this.userModel.updateOne(
            { email: mail },
            { subjects: dto.subjects, description: dto.description, firstName: dto.firstName, 
              lastName: dto.lastName, address: dto.address, birthDate: dto.birthDate, profileImg: dto.profileImg},
            { upsert: true },
        ).exec();
        return this.userModel.find({email: mail}, {firstName: 1, lastName: 1, _id:0});
    }

    async checkUnique(ssid:string){
      return await this.userModel.find({citizenID:ssid})
      .then(result=>{
        if (result.length==0) return { result : true}
        return { result :false}
      })
    }
}
