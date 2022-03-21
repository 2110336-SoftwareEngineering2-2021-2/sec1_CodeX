import * as mongoose from 'mongoose';
import { UserSchema } from '../user/user.schema';

export class LearnScheduleFilledDto {
  startDate: Date
  studentId : String
  days: 
    {
      
      day?: String,
      slots?: SlotFilled[],
    }[] 
};

export class SlotFilled{
    
        slot: Number
        data : 
          {
          slotId : String,
          subject: String,
          description: String,
          tutorId : String
          tutorName : String,
          tutorLastName : String,
          zoomURL : String
          members : String[]
         
          }[]
      
}

