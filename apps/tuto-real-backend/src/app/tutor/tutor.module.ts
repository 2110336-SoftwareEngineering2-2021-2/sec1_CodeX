import { Module } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { TutorController } from './tutor.controller';
import { UserSchema } from '../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleSchema } from '../schedule/schedule.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
,MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }])],
  providers: [TutorService],
  controllers: [TutorController],
  exports: [TutorService],
})
export class TutorModule {}
