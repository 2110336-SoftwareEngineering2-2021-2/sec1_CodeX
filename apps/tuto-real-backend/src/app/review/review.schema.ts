import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
  createdAt: { type: Date },
  lastUpdated: { type: Date },
  rating: { type: Number, default: 0, required: true },
  comment: { type: String },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

ReviewSchema.path('rating').required(true);
