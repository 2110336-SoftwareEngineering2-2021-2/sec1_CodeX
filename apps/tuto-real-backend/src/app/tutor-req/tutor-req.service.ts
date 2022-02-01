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
        
        return await this.reqModel.updateOne({ "uid" : dto.uid} , dto , {upsert :true}) ;
        
      }
    
    




}
