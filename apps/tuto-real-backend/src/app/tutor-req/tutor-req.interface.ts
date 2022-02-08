import { Document } from 'mongoose';

export interface TutorReq extends Document {
  firstName: String;
  lastName: String;
  readonly email: String;
  readonly citizenID: {
    fileName: String;
    url: String;
  };
  readonly transcription: {
    fileName: String;
    url: String;
  };
  readonly timeStamp: Date;
}
