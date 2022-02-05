import { Document } from 'mongoose';



export interface Booking extends Document {

    //readonly subjects: [String],
    //readonly description : String

    readonly firstName : String,
    readonly lastName : String,
    readonly phoneNumber : String,
    readonly email : String,
    birthDate : Date,
    readonly address : String,
    readonly citizenID : String,
    role : String,
    profileImg : {
        fileName : String , 
        url : String
    }
}