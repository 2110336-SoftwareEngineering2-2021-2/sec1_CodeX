import * as mongoose from 'mongoose';


export const TutorSchema = new mongoose.Schema({
    uid: String,
    subjects: [String],
    description : String
});