import * as mongoose from 'mongoose';
import { UserSchema } from '../user/user.schema';

export const ScheduleSchema = new mongoose.Schema({
  startDate: { type: Date, require: true },
  days: [
    {
      _id: false,
      day: String,
      slots: [
        {
          slot: Number,
          subject: String,
          description: String,
         // _id: false,
          students: {
            type: [
              {
                _id: false,
                status: {
                  type: String,
                  enum: ['Approved', 'Pending'],
                  default: 'Pending',
                },
                id: String,
                firstName: String,
                lastName: String,
              },
            ],
            default: undefined,
          },
        },
      ],
    },
  ],
});

ScheduleSchema.path('startDate').required(true);
