import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReq } from './tutor-req.interface';

@Injectable()
export class TutorReqService {

    constructor(@InjectModel('TutorRequest') private reqModel: Model<TutorReq>){}

    findAll(){
        return this.reqModel.find({ status: "Pending" }).sort({timeStamp: 'asc'}).exec()
    }

    async create(dto : TutorReqDto)  {
        const createdReq = new this.reqModel(dto);
        return await createdReq.save();
      }
    
    




}
