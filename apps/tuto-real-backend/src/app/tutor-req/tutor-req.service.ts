import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import { deleteImg, uploadImage, uploadImageBy64 } from '../util/google';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReq } from './tutor-req.interface';
import { updateStatusDto } from './updateStatus.dto';

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

  async create(fileCitizen, fileTran, dto: TutorReqDto) {
    dto.timeStamp = new Date();
    await uploadImage('Evidence', fileCitizen[0]).then((url) => {
      dto.citizenID = {
        fileName: fileCitizen[0].originalname,
        url: url,
      };
    });
    await uploadImage('Evidence', fileTran[0]).then((url) => {
      dto.transcription = {
        fileName: fileTran[0].originalname,
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

  async create1(dto) {
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
  async updateStatus(mail: string, dto: updateStatusDto) {
    if (dto.status == 'Reject') {
       const cit_img = await this.reqModel.find({email: mail},{"citizenID.url": 1, _id:0})
       const tran_img = await this.reqModel.find({email: mail},{"transcription.url": 1, _id:0})

      await this.reqModel.deleteOne({ email: mail });
      await deleteImg(cit_img[0].citizenID.url.split("Evidence/")[1],"Evidence");
      await deleteImg(tran_img[0].transcription.url.split("Evidence/")[1],"Evidence");
    } else if (dto.status == 'Approved') {
      await this.reqModel
        .updateOne({ email: mail }, { status: 'Approved' }, { upsert: true })
        .exec();
      await this.userModel
        .updateOne({ email: mail }, { role: 'Tutor' }, { upsert: true })
        .exec();
    }
    return this.userModel.find(
      { email: mail },
      { firstName: 1, lastName: 1, _id: 0 }
    );
  }
}
