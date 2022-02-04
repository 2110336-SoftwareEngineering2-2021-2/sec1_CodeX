import * as mongoose from 'mongoose';
import { imgSchema } from '../util/image.schema';



export const UserSchema = new mongoose.Schema({

    //subjects: [String],
    //description : String,
    firstName : String,
    lastName : String,
    phoneNumber : String,
    email : String,
    birthDate : Date,
    address : String,
    citizenID : String,
    role: String,
    profileImg :{
        type: imgSchema,
        default: {}
      } 
});