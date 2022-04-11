import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookingDto, UpdateBookingDto } from './booking.dto';
import { Booking } from './booking.interface';
import { BookingService } from './booking.service';
import { LearnScheduleDto } from '../LearnSchedule/learnSchedule.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  /* @Get('')
    GetProfileByMail(@Param('email') mail : String) {

        return this.service.GetProfileByMail(mail); 
    }*/

  @Post('/create')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create the booking' })
  @ApiCreatedResponse({
    description: 'The booking has been successfully created.',
  })
  @ApiNotFoundResponse({ description: 'Student or Tutor is not found.' })
  @ApiBadRequestResponse({ description: 'The booking cannot be created.' })
  @ApiBody({ type: BookingDto })
  createBooking(@Body() dto: BookingDto) {
    try {
      return this.service.createBooking(dto);
    } catch (err) {
      return err;
    }
  }

  /*@Post('/test')
  //@UseGuards(FirebaseAuthGuard)
  updateLearnSchedule(@Body() dto: BookingDto) {
    try {
      return this.service.updateLearnSchedule(dto);
    } catch (err) {}
  }
  */
 
  @Get('/tutor')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get tutor booking' })
  @ApiOkResponse({ description: 'Get all bookings successfully' })
  @ApiNotFoundResponse({ description: 'Tutor is not found' })
  @ApiQuery({ name: '_id', description: 'Please enter the tutor ID' })
  getBookingTutor(@Query() query: any) {
    try {
      return this.service.getBookingTutor(query._id);
    } catch (error) {
      return error;
    }
  }

  @Get('/student')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get student booking' })
  @ApiOkResponse({ description: 'Get all bookings successfully' })
  @ApiNotFoundResponse({ description: 'Student is not found' })
  @ApiQuery({ name: '_id', description: 'Please enter the student ID' })
  getBookingStudent(@Query() query: any) {
    try {
      return this.service.getBookingStudent(query._id);
    } catch (error) {
      return error;
    }
  }

  @Patch()
  @ApiOperation({ summary: 'Update the booking' })
  @ApiOkResponse({ description: 'Get all bookings successfully' })
  @ApiNotFoundResponse({
    description: 'Schedule of the updating booking is not found',
  })
  @ApiBadRequestResponse({ description: 'Fail to update the booking' })
  @ApiQuery({ name: '_id', description: 'Please enter the booking ID' })
  @ApiBody({ type: UpdateBookingDto })
  updateBooking(@Query() query: any, @Body() dto: BookingDto) {
    try {
      return this.service.updateBooking(query._id, dto);
    } catch (error) {
      return error;
    }
  }
}
