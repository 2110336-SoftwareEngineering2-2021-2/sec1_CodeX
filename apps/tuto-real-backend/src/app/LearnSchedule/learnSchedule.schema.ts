import * as mongoose from 'mongoose';
import { UserSchema } from '../user/user.schema';

export const LearnScheduleSchema = new mongoose.Schema({
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
          [{
          slotId : String,
          _id:false
          }]
        },
      ],
    },
  ],
});

LearnScheduleSchema.path('startDate').required(true);
