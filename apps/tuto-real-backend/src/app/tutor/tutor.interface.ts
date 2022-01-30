import { Document } from 'mongoose';


export interface Tutor extends Document {
    readonly  uid: String,
    readonly subjects: [String],
    readonly description : String
}