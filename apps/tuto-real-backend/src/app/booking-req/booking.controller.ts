import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.interface';
import { BookingService } from './booking.service';
import { LearnScheduleDto } from '../LearnSchedule/learnSchedule.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  /* @Get('')
    GetProfileByMail(@Param('email') mail : String) {

        return this.service.GetProfileByMail(mail); 
    }*/

  @Post('/create')
  @UseGuards(FirebaseAuthGuard)
  createBooking(@Body() dto: BookingDto) {
    try {
      return this.service.createBooking(dto);
    } catch (err) {
      return err;
    }
  }

  @Post('/test')
  @UseGuards(FirebaseAuthGuard)
  updateLearnSchedule(@Body() dto: BookingDto) {
    try {
      return this.service.updateLearnSchedule(dto);
    } catch (err) {}
  }

  @Get('/tutor')
  @UseGuards(FirebaseAuthGuard)
  getBookingTutor(@Query() query: any) {
    try {
      return this.service.getBookingTutor(query._id);
    } catch (error) {
      return error;
    }
  }

  @Get('/student')
  @UseGuards(FirebaseAuthGuard)
  getBookingStudent(@Query() query: any) {
    try {
      return this.service.getBookingStudent(query._id);
    } catch (error) {
      return error;
    }
  }
}
