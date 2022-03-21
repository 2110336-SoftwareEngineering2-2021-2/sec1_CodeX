import * as mongoose from 'mongoose';

export class ReviewDto {
    createdAt: Date
    lastUpdated: Date
    rating: Number
    comment: String 
    tutor: String
    writer: String
}
