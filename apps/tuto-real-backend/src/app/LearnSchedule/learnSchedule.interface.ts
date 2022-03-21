import { Document } from 'mongoose';

export interface LearnSchedule extends Document {
  startDate: { type: Date, require: true },
  studentId : { type: String, require: true },
  
  days: [
    {
      _id: false,
      day: String,
      slots: [
        {
          slot: Number,
          data :
          {
          slotId : String
         
          }[]
        },
      ],
    },
  ],
};


