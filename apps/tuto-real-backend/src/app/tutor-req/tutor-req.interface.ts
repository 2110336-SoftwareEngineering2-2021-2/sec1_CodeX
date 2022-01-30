import { Document } from 'mongoose';


export interface TutorReq extends Document {
    readonly  uid: String,
    readonly evidenceURL: [String],
    readonly timeStamp : Date
}