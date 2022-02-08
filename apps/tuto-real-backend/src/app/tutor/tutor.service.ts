import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.interface';

@Injectable()
export class TutorService {
  constructor(@InjectModel('User') private tutorModel: Model<User>) {}

  /*GetProfileByID(id : String)  {

        return this.tutorModel.find({uid:id}).exec()
  
    }*/

  /*UploadImage(dto : UserDto){
        return this.tutorModel.create(dto);
    }*/
}
