import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.interface';
import { uploadImage, uploadImageBy64 } from '../util/google';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReq } from './tutor-req.interface';

@Injectable()
export class TutorReqService {

    constructor(@InjectModel('TutorRequest') private reqModel: Model<TutorReq>,
    @InjectModel('User') private userModel: Model<User>){}

    findAll(){
        return this.reqModel.find({ status: "Pending" }).sort({timeStamp: 'asc'}).exec()
    }

    async create(fileCitizen, fileTran , dto : TutorReqDto)  {
  
        dto.timeStamp = new Date();
        await uploadImage("Evidence",fileCitizen[0]) 
           .then((url)=>{
                dto.citizenID ={
                       fileName:fileCitizen[0].originalname,
                       url:url}
        })
        await uploadImage("Evidence",fileTran[0]) 
           .then((url)=>{
                dto.transcription ={
                       fileName:fileTran[0].originalname,
                       url:url}
        })
        
        

       return await this.userModel.find({email:dto.email}).exec()
       .then(async(name) =>{
           dto.firstName = name[0].firstName
           dto.lastName = name[0].lastName
            return await this.reqModel.updateOne({ "email" : dto.email} , dto , {upsert :true}) ;
       })
       
        
      }

    async create1(dto){
        dto.timeStamp = new Date();
        await uploadImageBy64("Evidence",dto.citizenID64) 
           .then((url)=>{
                dto.citizenID ={
                       url:url}
        })
        await uploadImageBy64("Evidence",dto.transcription64) 
           .then((url)=>{
                dto.transcription ={
                       url:url}
        })
        
        

       return await this.userModel.find({email:dto.email}).exec()
       .then(async(name) =>{
           dto.firstName = name[0].firstName
           dto.lastName = name[0].lastName
            return await this.reqModel.updateOne({ "email" : dto.email} , dto , {upsert :true}) ;
       })
       
        
    }
    
    




}
