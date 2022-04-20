import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingDto, UpdateBookingDto } from './booking.dto';
import { BookingService } from './booking.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Bookings')
@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Post('create')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
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

  @Get('tutor')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
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

  @Get('student')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
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
  @UseGuards(FirebaseAuthGuard, RolesGuard)
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
