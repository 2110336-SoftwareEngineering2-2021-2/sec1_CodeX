import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TutorController } from '../tutor/tutor.controller';
import { TutorService } from '../tutor/tutor.service';
import { UserSchema } from '../user/user.schema';
import { TutorReqController } from './tutor-req.controller';
import { TutorReqSchema } from './tutor-req.schema';
import { TutorReqService } from './tutor-req.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TutorRequest', schema: TutorReqSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [TutorReqController],
  providers: [TutorReqService],
  exports: [TutorReqService],
})
export class TutorReqModule {}
