import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import {
  deleteImg,
  uploadImage,
  uploadImageBy64,
} from '../util/google';
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

  async findAll() {
    return await this.reqModel
      .find({ status: 'Pending' })
      .sort({ timeStamp: 'asc' })
      .exec()
      .then((res) => {
        return { success: true, data: res };
      })
      .catch((err) => {
        throw new NotFoundException({ success: false, data: err.msg });
      });
  }

  async create(fileCitizen, fileTran, dto: TutorReqDto) {
    dto.timeStamp = new Date();
    await uploadImage('Evidence', fileCitizen[0])
      .then((url) => {
        dto.citizenID = {
          //fileName: fileCitizen[0].originalname,
          url: url,
        };
      })
      .catch((err) => {
        throw new BadRequestException({
          success: false,
          data: 'Bad citizenID image file',
        });
      });

    await uploadImage('Evidence', fileTran[0])
      .then((url) => {
        dto.transcription = {
          //fileName: fileTran[0].originalname,
          url: url,
        };
      })
      .catch((err) => {
        throw new BadRequestException({
          success: false,
          data: 'Bad transcription image file',
        });
      });

    return await this.userModel
      .find({ email: dto.email })
      .exec()
      .then(async (name) => {
        dto.firstName = name[0].firstName;
        dto.lastName = name[0].lastName;
        return await this.reqModel
          .updateOne({ email: dto.email }, dto, {
            upsert: true,
          })
          .then((res) => {
            return { success: true, data: res };
          })
          .catch((err) => {
            throw new NotFoundException({
              success: false,
              data: 'User not found',
            });
          });
      })
      .catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });
  }

  async create1(dto) {
    dto.timeStamp = new Date();
    await uploadImageBy64('Evidence', dto.citizenID64)
      .then((url) => {
        dto.citizenID = {
          url: url,
        };
      })
      .catch((err) => {
        throw new BadRequestException({
          success: false,
          data: 'Bad citizenID image file',
        });
      });

    await uploadImageBy64('Evidence', dto.transcription64)
      .then((url) => {
        dto.transcription = {
          url: url,
        };
      })
      .catch((err) => {
        throw new BadRequestException({
          success: false,
          data: 'Bad transcription image file',
        });
      });

    return await this.userModel
      .find({ email: dto.email })
      .exec()
      .then(async (name) => {
        dto.firstName = name[0].firstName;
        dto.lastName = name[0].lastName;
        return await this.reqModel
          .updateOne({ email: dto.email }, dto, {
            upsert: true,
          })
          .then((res) => {
            return { success: true, data: res };
          })
          .catch((err) => {
            throw new NotFoundException({
              success: false,
              data: 'User not found',
            });
          });
      })
      .catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });
  }

  async updateStatus(id: string, dto: updateStatusDto) {
    const { email, firstName, lastName, citizenID, transcription } =
      await this.reqModel.findById(id).catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });

    if (dto.status == 'Reject') {
      await this.reqModel.deleteOne({ _id: id }).catch((err) => {
        throw new NotFoundException({ success: false, data: 'User not found' });
      });

      await deleteImg(citizenID.url.split('Evidence/')[1], 'Evidence').catch(
        (err) => {
          throw new NotFoundException({
            success: false,
            data: 'CitizenId image not found',
          });
        }
      );
      await deleteImg(
        transcription.url.split('Evidence/')[1],
        'Evidence'
      ).catch((err) => {
        throw new NotFoundException({
          success: false,
          data: 'Transcription image not found',
        });
      });
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
      }).catch((err) => {
        throw new ForbiddenException({
          success: false,
          data: 'Can not connect Zoom API',
        });
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
      }).catch((err) => {
        throw new ForbiddenException({
          success: false,
          data: 'Can not connect Zoom API',
        });
      });

      await this.reqModel
        .updateOne({ _id: id }, { status: 'Approved' })
        .exec()
        .catch((err) => {
          throw new NotFoundException({
            success: false,
            data: 'User not found',
          });
        });

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
            numReviews: 0,
            avgRating: 0,
          },
          { new: true }
        )
        .exec()
        .then((res) => {
          return { success: true, data: res };
        })
        .catch((err) => {
          throw new NotFoundException({
            success: false,
            data: 'User not found',
          });
        });
    }
  }
}
