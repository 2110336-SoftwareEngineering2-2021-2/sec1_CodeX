import { Document } from 'mongoose';


export interface TutorReq extends Document {
    readonly  uid: String,
    readonly evidenceImg: {
        fileName : String , 
        url : String
      }[],
    readonly timeStamp : Date
}