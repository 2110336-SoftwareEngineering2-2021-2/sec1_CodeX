import * as mongoose from 'mongoose';


export interface Schedule extends Document {
  //tutor only
  startDate : Date,
  pricePerSlot: Number,
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

}


