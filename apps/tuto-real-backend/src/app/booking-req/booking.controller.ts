import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
  Create(@Body() dto: BookingDto) {
    dto.timeStamp = new Date();

    return this.service.Create(dto);
  }
}
