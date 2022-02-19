import * as mongoose from 'mongoose';
import { UserSchema } from '../user/user.schema';

export const ScheduleSchema = new mongoose.Schema({
    startDate: {type: Date, require: true},
    pricePerSlot: {type: Number, require: true},
    days: [{
            day: String,
            slots: [{
                slot: Number,
                subject: String,
                description: String,
                students: {type:[{
                    status: {
                        type: String,
                        enum: ['Approved', 'Pending'],
                        default: 'Pending',
                    },
                    id: String,
                    firstName: String,
                    lastName: String
                }], default: undefined}
            }]
        }]
});

ScheduleSchema.path('startDate').required(true);
ScheduleSchema.path('pricePerSlot').required(true);






