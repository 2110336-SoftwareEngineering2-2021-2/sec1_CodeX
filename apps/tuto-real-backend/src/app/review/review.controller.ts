import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { createReviewDto } from './createReview.dto';
import { ReviewService } from './review.service';
import { updateReviewDto } from './updateReview.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}
  @Post()
  @UseGuards(FirebaseAuthGuard)
  createReview(@Body() dto: createReviewDto) {
    try {
      return this.service.createReview(dto);
    } catch (err) {
      return err;
    }
  }

  @Put()
  @UseGuards(FirebaseAuthGuard)
  updateReview(@Query('_id') id: string, @Body() dto: updateReviewDto) {
    try {
      return this.service.updateReview(id, dto);
    } catch (err) {
      return err;
    }
  }

  @Get()
  //@UseGuards(FirebaseAuthGuard)
  getReviews(
    @Query('_id') id: string,
    @Query('sortBy') sortBy: string,
    @Query('sid') sid: string
  ) {
    try {
      return this.service.getReviews(id, sortBy, sid);
    } catch (err) {
      return err;
    }
  }
}
