import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uploadImage } from '../util/google';
import { UserDto } from './user.dto';
import { User } from './user.interface';

const mongoose = require('mongoose');
@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>){}

    GetProfileByID(id : String)  {
   
        return this.userModel.find({_id: mongoose.Types.ObjectId(id)}).exec()
  
    }

    async Create(dto : UserDto){

        return this.userModel.create(dto);
    }
}
