import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import {Report} from './report.interface'
import { CreateReportDto , ReportDto } from './report.dto';
import { uploadImageBy64 } from '../util/google';
const mongoose = require('mongoose');
@Injectable()
export class ReportService {
  constructor(
    @InjectModel('Report') private reportModel: Model<Report>,
  
  ) {}

  public async getAll(_id : string){
   
    var filter = {}
    if (_id!=undefined) {
      try{
        var objId = _id==undefined? undefined:new mongoose.Types.ObjectId(_id)
      }catch(err){
        throw new BadRequestException({success:false,data:"Id wrong format"})
      }
      filter = {targetId:objId , status:"Approved"}
    }
    
    var result = await (
      this.reportModel.find(filter).sort({status : -1 , createAt : 1}).populate({
        path: 'reporterId',
        select: 'firstName lastName',
      })
    .populate({
      path: 'targetId',
      select: 'firstName lastName',
    }))
      .catch((err)=>{
        throw new InternalServerErrorException({success:false,data:err})
      })
    console.log(result)
    return result
  }

  public async create(dto : CreateReportDto){
    var report = new ReportDto()
    var now = new Date()
    now.setHours(now.getHours()+7)
    report.createdAt = now
    report.status = "Pending"
    report.text = dto.text
    report.targetId = dto.targetId
    report.reporterId = dto.reporterId
    report.imageUrl = dto.reportImg==undefined? undefined : await uploadImageBy64('Report', dto.reportImg);
    return await this.reportModel.create(report)
    .then((res)=>{
      return {sucess : true , data : dto}
    })
    .catch((err)=>{
      throw new BadRequestException({success:false,data:err})
    })
  }

  public async updateReportStatus(_id:string , isBan:boolean){
    try {
      _id = new mongoose.Types.ObjectId(_id)
    } catch(err){
      throw new BadRequestException({success:false,data:"Id wrong format"})
    }
    if (isBan){
      return await this.reportModel.updateOne(
        {"_id":_id},
        { $set: { "status" : "Approved" } }) 
        .then((res)=>{
          return res
        })
        .catch((err)=>{
          throw new NotFoundException({success:false,data:"Report not found"})
        })
    }
    else {
      return await this.reportModel.deleteOne({_id:new mongoose.Types.ObjectId(_id)})
      .then((res)=>{
        return res
      })
      .catch((err)=>{
        throw new NotFoundException({success:false,data:"Report not found"})
      })
  }
}


}




