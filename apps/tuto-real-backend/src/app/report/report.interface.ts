import * as mongoose from 'mongoose';

export interface Report extends mongoose.Document {
  createdAt: Date;
  text : string;
  reporterId : string;
  targetId : string;
  status : string;
  imageUrl : string
}

