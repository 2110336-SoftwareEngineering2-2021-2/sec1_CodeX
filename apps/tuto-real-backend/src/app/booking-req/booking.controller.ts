import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.interface';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  /* @Get('')
    GetProfileByMail(@Param('email') mail : String) {

        return this.service.GetProfileByMail(mail); 
    }*/

  @Post('/create')
  createBooking(@Body() dto: BookingDto) {
    try {
      return this.service.createBooking(dto);
    } catch (err) {
      return err;
    }
  }

  @Get('/tutor')
  getBookingTutor(@Query() query: any) {
    try {
      return this.service.getBookingTutor(query._id);
    } catch (error) {
      return error;
    }
  }
}
