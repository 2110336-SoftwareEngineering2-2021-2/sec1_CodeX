import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { createReviewDto, getReviewsDto, getReviewQuery } from './createReview.dto';
import { ReviewService } from './review.service';
import { updateReviewDto } from './updateReview.dto';

@ApiTags('Review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}
  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create a review' })
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'User cannot review to this tutor.',
  })
  createReview(@Body() dto: createReviewDto) {
    try {
      return this.service.createReview(dto);
    } catch (err) {
      return err;
    }
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
  })
  updateReview(@Query('_id') id: string, @Body() dto: updateReviewDto) {
    try {
      return this.service.updateReview(id, dto);
    } catch (err) {
      return err;
    }
  }

  

  @Get()
  @ApiOperation({ summary: "Get tutor's review" })
  @ApiResponse({
    status: 200,
    type: getReviewsDto,
  })
  getReviews(
    @Query() q : getReviewQuery) {
    try {
      return this.service.getReviews(q._id, q.sortBy, q.sid);
    } catch (err) {
      return err;
    }
  }
}
