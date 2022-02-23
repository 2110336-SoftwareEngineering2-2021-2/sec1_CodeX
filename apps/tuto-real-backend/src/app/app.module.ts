import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { BookingModule } from './booking-req/booking.module';
import { TutorReqModule } from './tutor-req/tutor-req.module';
import { TutorModule } from './tutor/tutor.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { BookingModule } from './booking-req/booking.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mainUser:mainUser@codex.iuovi.mongodb.net/CodeX?retryWrites=true&w=majority',
      { useNewUrlParser: true }
    ),
    TutorReqModule,
    TutorModule,
    UserModule,
    ScheduleModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
