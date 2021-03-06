import { Document } from 'mongoose';

export interface User extends Document {
  readonly subjects: { type: [String]; default: undefined };
  readonly description: { type: [String]; default: undefined };
  numReviews: Number;
  avgRating: Number;
  studiedWith: [String];
  schedule: { type: Object; default: undefined };

  readonly firstName: String;
  readonly lastName: String;
  readonly phoneNumber: String;
  readonly email: String;
  birthDate: Date;
  readonly address: String;
  readonly citizenID: String;
  role: String;
  readonly zoomID: String;
  readonly zoomStartURL: String;
  readonly zoomJoinURL: String;
  profileImg: {
    fileName: String;
    url: String;
  };
  schedule_id: [String];
  pricePerSlot: { type: Number; default: 0 };
  isBan: { type: Boolean; default: false };
  unbanDate: Date;
}
