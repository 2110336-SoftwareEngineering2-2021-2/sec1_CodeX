import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorReqController } from './tutor-req.controller';
import { TutorReqSchema } from './tutor-req.schema';
import { TutorReqService } from './tutor-req.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'TutorRequest', schema: TutorReqSchema }])],
    controllers: [TutorReqController],
    providers: [TutorReqService],
  })
export class TutorReqModule {}
