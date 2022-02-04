import * as mongoose from 'mongoose';
import { imgSchema } from '../util/image.schema';


export const TutorReqSchema = new mongoose.Schema({
  email: String,
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