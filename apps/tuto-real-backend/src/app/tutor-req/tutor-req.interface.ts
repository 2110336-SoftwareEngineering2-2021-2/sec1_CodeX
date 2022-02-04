import { Document } from 'mongoose';


export interface TutorReq extends Document {
    readonly  email: String,
    readonly evidenceImg: {
        fileName : String , 
        url : String
      }[],
    readonly timeStamp : Date
}