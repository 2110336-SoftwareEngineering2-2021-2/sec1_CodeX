import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Report} from './report.interface'
import { CreateReportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel('Report') private reportModel: Model<Report>,
  
  ) {}

  public async getAll(){
    var result = await (
      this.reportModel.find().sort({status : -1 , createAt : 1}).populate({
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
    /*var now = new Date()
    now.setHours(now.getHours()+7)
    dto.createdAt = now
    return await this.reportModel.create(dto)
    .then((res)=>{
      return {sucess : true , data : dto}
    })
    .catch((err)=>{
      throw new BadRequestException({success:false,data:err})
    })*/
  }

  public async updateReportStatus(_id:string , isBan:boolean){
    return 
  }


}




