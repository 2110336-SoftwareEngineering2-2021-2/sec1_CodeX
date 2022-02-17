import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.interface';
import { sendMail } from '../util/google';
import { CriteriaDto } from './cirteria.dto';
import { Schedule } from './schedule.interface';

@Injectable()
export class TutorService {
  constructor(@InjectModel('User') private tutorModel: Model<User> ,
  @InjectModel('Schedule') private scheduleModel: Model<Schedule>  ) {}

  public async getTutor(): Promise<UserDto[]> {
    const tutors = this.tutorModel.find({ role: 'Tutor' }).exec();
    return tutors;
  }

  public async searchTutor(dto : CriteriaDto) : Promise<any> {
  var queryKeyword = [],queryDays = []
  //console.log(dto)
  if (!!dto.keyword){
    dto.keyword.forEach((word)=>{
        if (word.length>=3)
          queryKeyword.push({$or : [{description : {$regex:word, $options : 'i'}},
                                {firstName : {$regex:word, $options : 'i'}} ,
                                {lastName : {$regex:word, $options : 'i'}},
                                {"schedules.days.slots.description" : {$regex:word, $options : 'i'}}
                              ]})
    })}
  if (!!dto.days){
    var tmp
    dto.days.forEach((day)=>{
      tmp = "schedules.days.day"
        queryDays.push({ [tmp] : day})
    })
  }

   var join = await this.tutorModel
   .aggregate([
    {$match : {$and :[
      (!!dto.subjects)? { subjects:  { $all: dto.subjects }} : {},
      {sid:{$exists : true}},
      {role : "Tutor"}      
  ]}},
  {
    $project: {
      "sid": {
          $map: {
          input: "$sid",
          in: { $toObjectId: "$$this" }
        }
      }
    }
  }
    ,
    {$lookup: {
              from: "schedules",
              localField: "sid",
              foreignField: "_id",
              as: "schedules"
          }
  },{
    $match: {$and :[
        (!!dto.days)? {$and : queryDays} : {} ,
        (!!dto.rate)? { "schedules.pricePerSlot" : { $gte :  dto.rate.min, $lte : dto.rate.max}}:{} ,
        (!!dto.keyword && queryKeyword.length!=0)? { $and :  queryKeyword} :{}
    ]}
  }])
  console.log(join)
  return join
  /*return await this.tutorModel.find({ $where: function () {
    var search_key = "description";

    function check_key(document) {
      return Object.keys(document).some(function(key) {
        if ( typeof(document[key]) == "object" ) {
            return check_key(document[key]);
        } else if (key==search_key){
          return document[key].includes("Enjoy");
        }
      });
    }
    return check_key(this);
  }})*/
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
