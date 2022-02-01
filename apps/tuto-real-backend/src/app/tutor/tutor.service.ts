import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TutorDto } from './tutor.dto';
import { Tutor } from './tutor.interface';


@Injectable()
export class TutorService {

    constructor(@InjectModel('Tutor') private tutorModel: Model<Tutor>){}

    GetProfileByID(id : String)  {

        return this.tutorModel.find({uid:id}).exec()
  
    }

    UploadImage(dto : TutorDto){
        return this.tutorModel.create(dto);
    }
}
