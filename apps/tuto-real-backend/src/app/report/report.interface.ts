import * as mongoose from 'mongoose';

export interface Report extends mongoose.Document {
  createdAt: Date;
  reportInfo : string;
  reporterId : string;
  targetId : string;
  status : string;
}

