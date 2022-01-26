import * as mongoose from 'mongoose';


export const TutorReqSchema = new mongoose.Schema({
  uid: String,
   evidenceURL: [String],
   status: {
    type: String,
    enum : ['Approved','Pending'],
    default: 'Pending'
},
  timeStamp : Date
});