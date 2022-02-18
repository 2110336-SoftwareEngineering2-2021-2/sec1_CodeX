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
                students:[{
                    status: {
                        type: String,
                        enum: ['Approved', 'Pending'],
                        default: 'Pending',
                    },
                    id: String,
                    firstName: String,
                    lastName: String
                }]
            }]
        }]
});

UserSchema.path('startDate').required(true);
UserSchema.path('pricePerSlot').required(true);