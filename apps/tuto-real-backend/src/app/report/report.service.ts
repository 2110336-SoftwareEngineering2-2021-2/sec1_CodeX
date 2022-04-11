import { HttpException, Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from '../user/user.dto';
import { User } from '../user/user.interface';
import { sendMail } from '../util/google';
import {Report} from './report.interface'
import { Schedule } from '../schedule/schedule.interface';
import { CreateReportDto, ReportDto } from './report.dto';
import { networkInterfaces } from 'os';

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




