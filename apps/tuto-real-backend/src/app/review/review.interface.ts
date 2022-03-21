import * as mongoose from 'mongoose';

export interface Review extends mongoose.Document {
  readonly createdAt: { type: Date };
  lastUpdated: { type: Date };
  rating: { type: Number; default: 0; required: true };
  comment: { type: String };
  tutor: { type: mongoose.Schema.Types.ObjectId };
  writer: { type: mongoose.Schema.Types.ObjectId };
}
