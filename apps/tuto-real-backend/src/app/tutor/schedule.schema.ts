import * as mongoose from 'mongoose';


export const ScheduleSchema = new mongoose.Schema({
  //tutor only
  startDate : Date,
  pricePerSlot: { type: Number, default:0 },
  days : [{
      day : String,
      slots : [{
        slot : Number,
        subject : String,
        description : String,
        students : [{
            id : String,
            firstName : String,
            lastName : String
        }]
      }]
  }]

  //basic info

  
});

ScheduleSchema.path('startDate').required(true);
ScheduleSchema.path('pricePerSlot').required(true);
ScheduleSchema.path('days').required(true);
