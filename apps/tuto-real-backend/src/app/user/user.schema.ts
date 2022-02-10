import * as mongoose from 'mongoose';
import { ImgSchema } from '../util/image.schema';

export const UserSchema = new mongoose.Schema({
  subjects: { type: [String], default: undefined },
  description: { type: String, default: undefined },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  email: { type: String, unique: true, require: true },
  birthDate: { type: Date, require: true },
  address: { type: String, require: true },
  citizenID: { type: String, unique: true, require: true },
  role: { type: String, default: 'Student' },
  profileImg: {
    type: ImgSchema,
    default: {},
  },
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
