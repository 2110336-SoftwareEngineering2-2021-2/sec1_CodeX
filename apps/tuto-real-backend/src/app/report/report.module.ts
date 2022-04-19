import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './report.schema';
import { UserModule } from '../user/user.module';
import { UserSchema } from '../user/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
