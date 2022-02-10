
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { deleteImg, uploadImage, uploadImageBy64 } from '../util/google';
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
    var id = 0 , mail = 0;
    await this.userModel.find({citizenID:dto.citizenID})
      .then(result=>{
        if (result.length!=0) id = 1
      })

      await this.userModel.find({email:dto.email})
      .then(result=>{
        if (result.length!=0) mail = 1
      })
    if (id+mail==2) return "Email and CitizenID already in use"
    else if (id==1) return "CitizenID already in use"
    else if (mail==1) return "Email already in use"
    else await this.userModel.create(dto);
  }

  async updateProfile(mail: string, dto: updateUserDto) {
        if(dto.profile64 != null){
          await this.userModel.find({ email: mail }).exec()
          .then(async (result)=>{
            //if prev img is not default, delete it
            console.log(result[0].profileImg.url.split("Profile/")[1])
            if (result[0].profileImg.url.split("Profile/")[1] != "default.jpg"){
              await deleteImg(result[0].profileImg.url.split("Profile/")[1],"Profile")
            }
            await uploadImageBy64("Profile",dto.profile64)
            .then((url)=>{
              dto.profileImg = {url: url}
            });
          })
        }
        
        const userList = await this.userModel.find({ email: mail }).exec();
        await this.userModel.updateOne(
            { email: mail },
            { subjects: dto.subjects, description: dto.description, firstName: dto.firstName, 
              lastName: dto.lastName, address: dto.address, birthDate: dto.birthDate, profileImg: dto.profileImg},
            { upsert: true },
        ).exec();
        return this.userModel.find({email: mail}, {firstName: 1, lastName: 1, _id:0});
    }

}
