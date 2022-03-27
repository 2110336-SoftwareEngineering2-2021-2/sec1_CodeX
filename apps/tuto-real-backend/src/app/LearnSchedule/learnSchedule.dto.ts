import * as mongoose from 'mongoose';
import { UserSchema } from '../user/user.schema';

export class LearnScheduleDto {
  startDate: Date;
  studentId: String;
  subjects: [String];
  days: {
    day?: String;
    slots?: Slot[];
  }[];
}

export class Slot {
  slot: Number;
  data: [
    {
      slotId: String;
      subject: String;
      description: String;
      tutorId: String;
      tutorFirstName: String;
      tutorLastName: String;
      zoomURL: String;
      members: String[];
    }
  ];
}
