import * as mongoose from 'mongoose';
import { ImgSchema } from '../util/image.schema';


export const TutorReqSchema = new mongoose.Schema({
  email: String,
   evidenceImg: {
    type : [ImgSchema],
    default : [] 
   },
   status: {
    type: String,
    enum : ['Approved','Pending'],
    default: 'Pending'
},
  timeStamp : Date
});