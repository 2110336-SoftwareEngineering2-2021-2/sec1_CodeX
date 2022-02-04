import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadImage } from '../util/google';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReq } from './tutor-req.interface';

@Injectable()
export class TutorReqService {

    constructor(@InjectModel('TutorRequest') private reqModel: Model<TutorReq>){}

    findAll(){
        return this.reqModel.find({ status: "Pending" }).sort({timeStamp: 'asc'}).exec()
    }

    async create(files , dto : TutorReqDto)  {
        var urls=[]
        for await (const file of files){

           await uploadImage("Evidence",file) 
           .then((url)=>{
               urls.push({
                       fileName:file.originalname,
                       url:url})
           })
       }
   
       dto.evidenceImg = urls
        console.log(dto.evidenceImg)
        return await this.reqModel.updateOne({ "uid" : dto.uid} , dto , {upsert :true}) ;
        
      }
    
    




}
