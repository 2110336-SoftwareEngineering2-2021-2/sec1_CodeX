import * as mongoose from 'mongoose';
import { ImgSchema } from '../util/image.schema';

export const UserSchema = new mongoose.Schema({
  //tutor only
  subjects: { type: [String], default: undefined },
  description: { type: String, default: undefined },
  totalRating: { type: Number, default: undefined },
  numReviews: { type: Number, default: undefined },
  studiedWith: { type: [String], default: [] },
  avgRating: { type: Number, default: undefined },
  //basic info
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  birthDate: { type: Date, require: true },
  address: { type: String, require: true },
  citizenID: { type: String, unique: true, require: true },
  role: { type: String, default: 'Student' },
  zoomID: { type: String },
  zoomStartURL: { type: String },
  zoomJoinURL: { type: String },
  profileImg: {
    type: ImgSchema,
    default: {
      url: 'https://storage.googleapis.com/codex_img/Profile/default.jpg',
    },
  },
  pricePerSlot: { type: Number, default: 0 },
  schedule_id: [String],
});

UserSchema.path('email').index({ unique: true });
UserSchema.path('citizenID').index({ unique: true });
UserSchema.path('firstName').required(true);
UserSchema.path('lastName').required(true);
UserSchema.path('phoneNumber').required(true);
UserSchema.path('email').required(true);
UserSchema.path('birthDate').required(true);
UserSchema.path('address').required(true);
UserSchema.path('citizenID').required(true);
