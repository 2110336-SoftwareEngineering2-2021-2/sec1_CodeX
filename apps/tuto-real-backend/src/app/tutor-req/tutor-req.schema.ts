import * as mongoose from 'mongoose';
import { imgSchema } from '../image.schema';


export const TutorReqSchema = new mongoose.Schema({
  uid: String,
   evidenceImg: {
    type : [imgSchema],
    default : [] 
   },
   status: {
    type: String,
    enum : ['Approved','Pending'],
    default: 'Pending'
},
  timeStamp : Date
});