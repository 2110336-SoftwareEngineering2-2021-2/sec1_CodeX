import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingSchema } from './booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { ScheduleSchema } from '../schedule/schedule.schema';
import { LearnScheduleSchema } from '../LearnSchedule/learnSchedule.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Schedule', schema: ScheduleSchema }]),
    MongooseModule.forFeature([
      { name: 'LearnSchedule', schema: LearnScheduleSchema },
    ]),
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
