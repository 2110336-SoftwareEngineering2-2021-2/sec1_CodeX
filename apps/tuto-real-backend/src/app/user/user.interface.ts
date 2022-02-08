import { Document } from 'mongoose';

export interface User extends Document {
  readonly subjects: { type: [String]; default: undefined };
  readonly description: { type: [String]; default: undefined };
  readonly firstName: String;
  readonly lastName: String;
  readonly phoneNumber: String;
  readonly email: String;
  birthDate: Date;
  readonly address: String;
  readonly citizenID: String;
  role: String;
  profileImg: {
    fileName: String;
    url: String;
  };
}
