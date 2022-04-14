import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
  createdAt: Date,
  text : String,
  imageUrl : String,
  reporterId : { type : mongoose.Schema.Types.ObjectId , ref: 'User'},
  targetId : { type : mongoose.Schema.Types.ObjectId , ref: 'User'},
  status : {
        type: String,
        enum: ['Reject', 'Pending','Approved'],
        default: 'Pending',
      },
});

ReportSchema.path('text').required(true);
ReportSchema.path('targetId').required(true);
ReportSchema.path('reporterId').required(true);
ReportSchema.path('createdAt').required(true);
ReportSchema.path('status').required(true);
