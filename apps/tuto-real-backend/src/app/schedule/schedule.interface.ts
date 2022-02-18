import { Document } from 'mongoose';
export interface Schedule extends Document {
    readonly startDate: Date;
    pricePerSlot: Number;
    days: [{
            day: String,
            slots: [{
                slot: Number,
                subject: String,
                description: String,
                students:{type:[{
                    status: {
                        type: String,
                        enum: ['Approved', 'Pending'],
                        default: 'Pending',
                    },
                    id: String,
                    firstName: String,
                    lastName: String
                }], default: undefined};
            }]
        }];
}
