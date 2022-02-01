import { Document } from 'mongoose';


export interface TutorReq extends Document {
    readonly  uid: String,
    readonly evidenceImg: [{data : Buffer , name : String , type : String}],
    readonly timeStamp : Date
}