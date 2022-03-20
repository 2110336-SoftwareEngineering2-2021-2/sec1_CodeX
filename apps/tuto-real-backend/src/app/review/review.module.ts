import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.schema';
import { ReviewService } from './review.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Review', schema: ReviewSchema}])],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
