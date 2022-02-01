import * as mongoose from 'mongoose';
import { imgSchema } from '../image.schema';



export const TutorSchema = new mongoose.Schema({
    uid: String,
    subjects: [String],
    description : String,
    firstName : String,
    lastName : String,
    phoneNumber : String,
    email : String,
    birthDate : Date,
    address : String,
    citizenID : String,
    profileImg :{
        type: imgSchema,
        default: {}
      } 
});