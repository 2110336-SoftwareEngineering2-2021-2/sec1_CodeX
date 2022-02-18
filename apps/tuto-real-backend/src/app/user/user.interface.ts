import { Document } from 'mongoose';

export interface User extends Document {
  readonly subjects: { type: [String]; default: undefined };
  readonly description: { type: [String]; default: undefined };

  ratePrice : {type : Number , default : undefined};
  schedule : {type : Object, default : undefined};


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
  zoom_id: {type: String};
  schedule_id: [String];
  zoom_url: {type: String};
  numReviews: Number;
  totalRating: Number;
}
