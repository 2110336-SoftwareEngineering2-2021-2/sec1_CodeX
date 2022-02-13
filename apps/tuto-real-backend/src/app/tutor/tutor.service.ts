import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.interface';
import { sendMail } from '../util/google';
import { CriteriaDto } from './cirteria.dto';

@Injectable()
export class TutorService {
  constructor(@InjectModel('User') private tutorModel: Model<User>) {}

  public async getTutor(): Promise<UserDto[]> {
    const tutors = this.tutorModel.find({ role: 'Tutor' }).exec();
    return tutors;
  }

  public async searchTutor(dto : CriteriaDto) : Promise<any> {
    var queryKeywords = []
    console.log(dto)
    if (!!dto.keyword){
      dto.keyword.forEach((word)=>{
        queryKeywords.push({$or : [{description : {$regex:word}},
                                {firstName : {$regex:word}} ,
                                {lastName : {$regex:word}}]})
      })
  }
    return await this.tutorModel.find(
      {
        $and :[
          (!!dto.keyword)? { $and :  queryKeywords} :{} ,
          //{ ratePrice : (!!dto.ratePrice)? { $gt :  dto.ratePrice.min, $lt : dto.ratePrice.max}:{}} ,
          (!!dto.subjects)? { subjects:  { $all: dto.subjects }} : {},
          {role : "Tutor"}
          //{ schedule: {}}
        ]
      }
      )

  }

  async send(){
    return await sendMail()
    .then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
  }
  /*GetProfileByID(id : String)  {

        return this.tutorModel.find({uid:id}).exec()
  
    }*/

  /*UploadImage(dto : UserDto){
        return this.tutorModel.create(dto);
    }*/
}
