import * as mongoose from 'mongoose';
import { ImgSchema } from '../util/image.schema';


export const TutorReqSchema = new mongoose.Schema({
  firstName : String,
  lastName : String,
  email: String,
   citizenID: {
    type : ImgSchema
   },
   transcription: {
    type : ImgSchema
   },
   status: {
    type: String,
    enum : ['Approved','Pending'],
    default: 'Pending'
},
  timeStamp : Date
});