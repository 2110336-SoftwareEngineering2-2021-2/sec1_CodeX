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
import * as dotenv from 'dotenv'
import { User } from './user.interface';
import axios from 'axios';

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
dotenv.config()
const payload = {
  iss: process.env.API_KEY,
  exp: Date.now() + 6000,
};
const token = jwt.sign(payload, process.env.API_SECRET);
console.log(process.env.API_KEY, process.env.API_SECRET);
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async getProfile(id: String, email: String): Promise<any> {
    let profile;
    if (!!id) {
      if (id.length != 24) return { success: false, data: 'User not found!' };
      profile = await this.userModel
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .exec();
    } else if (!!email)
      profile = await this.userModel.findOne({ email }).exec();
    else return { success: false, data: 'User not found!' };
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

  public async updateProfile(id: String, dto: updateUserDto): Promise<any> {
    if (dto.profile64 != null) {
      await this.userModel
        .findOne({ _id: mongoose.Types.ObjectId(id) })
        .exec()
        .then(async (result) => {
          //if prev img is not default, delete it
          console.log(result.profileImg.url.split('Profile/')[1]);
          if (result.profileImg.url.split('Profile/')[1] != 'default.jpg') {
            await deleteImg(
              result.profileImg.url.split('Profile/')[1],
              'Profile'
            );
          }
          await uploadImageBy64('Profile', dto.profile64).then((url) => {
            dto.profileImg = { url };
          });
        });
    }

    try {
      await this.userModel
        .updateOne(
          { _id: mongoose.Types.ObjectId(id) },
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
      const profile = await this.userModel.find({
        _id: mongoose.Types.ObjectId(id),
      });
      return { success: true, data: profile[0] };
    } catch (err) {
      return { success: false, data: err.message };
    }
  }

  public async createZoomAccount(
    email: String,
    firstName: String,
    lastName: String,
    topic: String,
    description: String
  ): Promise<any> {
    const date = new Date().toISOString().slice(0, 11) + '00:00:00Z';
    let zoomID, zoomStartURL, zoomJoinURL;
    return await axios({
      method: 'post',
      url: 'https://api.zoom.us/v2/users',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Zoom-api-Jwt-Request',
      },
      data: {
        action: 'custCreate',
        user_info: {
          email: email,
          type: 1,
          first_name: firstName,
          last_name: lastName,
        },
      },
    })
      .then(async (res) => {
        zoomID = res.data.id;
        return await axios({
          method: 'post',
          url: `https://api.zoom.us/v2/users/${zoomID}/meetings`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Zoom-api-Jwt-Request',
          },
          data: {
            topic: topic,
            type: 8,
            start_time: date,
            duration: 17 * 60,
            timezone: 'Asia/Bangkok',
            agenda: description,
            recurrence: {
              type: 1,
              repeat_interval: 1,
              end_times: 30,
            },
            settings: {
              waiting_room: true,
              mute_upon_entry: true,
            },
          },
        });
      })
      .then(async (res) => {
        zoomStartURL = res.data.start_url;
        zoomJoinURL = res.data.join_url;
        const user = await this.userModel
          .findOneAndUpdate(
            { email },
            {
              zoomID,
              zoomStartURL,
              zoomJoinURL,
            },
            { new: true }
          )
          .exec();
        return { success: true, data: user };
      })
      .catch((err) => {
        return { success: false, data: err.message };
      });
  }
}
