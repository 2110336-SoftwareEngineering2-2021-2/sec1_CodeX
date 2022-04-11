import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BanUserService } from './ban-user.service';
import { BanUserController } from './ban-user.controller';
import { BanUserSchema } from './ban-user.schema';
@Module({
  imports: [
    
  ],
  providers: [BanUserService],
  controllers: [BanUserController],
  exports: [BanUserService],
})
export class BanUserModule {}
