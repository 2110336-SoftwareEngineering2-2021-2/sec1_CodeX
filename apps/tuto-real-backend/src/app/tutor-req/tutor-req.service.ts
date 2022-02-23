import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import { deleteImg, uploadImage, uploadImageBy64 } from '../util/google';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReq } from './tutor-req.interface';
import { updateStatusDto } from './updateStatus.dto';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TutorReqService {
  constructor(
    @InjectModel('TutorRequest') private reqModel: Model<TutorReq>,
    @InjectModel('User') private userModel: Model<User>
  ) {}

  findAll() {
    return this.reqModel
      .find({ status: 'Pending' })
      .sort({ timeStamp: 'asc' })
      .exec();
  }

  async create(dto) {
    dto.timeStamp = new Date();
    await uploadImageBy64('Evidence', dto.citizenID64).then((url) => {
      dto.citizenID = {
        url: url,
      };
    });
    await uploadImageBy64('Evidence', dto.transcription64).then((url) => {
      dto.transcription = {
        url: url,
      };
    });

    return await this.userModel
      .find({ email: dto.email })
      .exec()
      .then(async (name) => {
        dto.firstName = name[0].firstName;
        dto.lastName = name[0].lastName;
        return await this.reqModel.updateOne({ email: dto.email }, dto, {
          upsert: true,
        });
      });
  }

  async updateStatus(id: string, dto: updateStatusDto) {
    const { email, firstName, lastName, citizenID, transcription } =
      await this.reqModel.findById(id);

    if (dto.status == 'Reject') {
      await this.reqModel.deleteOne({ _id: id });
      await deleteImg(citizenID.url.split('Evidence/')[1], 'Evidence');
      await deleteImg(transcription.url.split('Evidence/')[1], 'Evidence');
    } else if (dto.status == 'Approved') {
      const token = jwt.sign(
        { iss: process.env.API_KEY },
        process.env.API_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
      const date = new Date().toISOString().slice(0, 11) + '00:00:00Z';
      
      const user = await axios({
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
      });

      const meeting = await axios({
        method: 'post',
        url: `https://api.zoom.us/v2/users/${user.data.id}/meetings`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Zoom-api-Jwt-Request',
        },
        data: {
          topic: `${firstName} ${lastName}'s meetings`,
          type: 8,
          start_time: date,
          duration: 17 * 60,
          timezone: 'Asia/Bangkok',
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

      await this.reqModel.updateOne({ _id: id }, { status: 'Approved' }).exec();

      const zoomID = meeting.data.id;
      const zoomStartURL = meeting.data.start_url;
      const zoomJoinURL = meeting.data.join_url;

      return await this.userModel
        .findOneAndUpdate(
          { email },
          {
            zoomID,
            zoomStartURL,
            zoomJoinURL,
            role: 'Tutor',
          },
          { new: true }
        )
        .exec();
    }
  }
}
