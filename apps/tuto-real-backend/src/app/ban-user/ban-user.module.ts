import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BanUserService } from './ban-user.service';
import { BanUserController } from './ban-user.controller';
import { UserSchema } from '../user/user.schema';
import { ReportModule } from '../report/report.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ReportModule,
    UserModule,
  ],
  providers: [BanUserService],
  controllers: [BanUserController],
  exports: [BanUserService],
})
export class BanUserModule {}
