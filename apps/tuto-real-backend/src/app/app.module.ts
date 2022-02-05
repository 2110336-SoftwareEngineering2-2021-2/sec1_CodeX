import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { BookingModule } from './booking-req/booking.module';
import { TutorReqModule } from './tutor-req/tutor-req.module';
import { TutorModule } from './tutor/tutor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mainUser:mainUser@codex.iuovi.mongodb.net/CodeX?retryWrites=true&w=majority',{ useNewUrlParser: true })
  ,TutorReqModule,TutorModule,UserModule],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
