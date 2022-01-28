import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TutorReqModule } from './tutor-req/tutor-req.module';
import { TutorModule } from './tutor/tutor.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://mainUser:mainUser@codex.iuovi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true })
  ,TutorReqModule,TutorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}