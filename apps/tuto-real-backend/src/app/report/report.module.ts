import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { UserSchema } from '../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from '../schedule/schedule.schema';
import {ReportSchema} from './report.schema'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }])
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
