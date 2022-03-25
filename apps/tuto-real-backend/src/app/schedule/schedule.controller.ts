import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './updateSchedule.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateSlotWithDeleteDto } from './updateSlotWithDelete.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  createSchedule(@Query() query: any, @Body() dto: ScheduleDto) {
    try {
      return this.service.createSchedule(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Patch('/add')
  @UseGuards(FirebaseAuthGuard)
  updateSlotWithAdd(@Query() query: any, @Body() dto: UpdateScheduleDto) {
    try {
      return this.service.updateSlotWithAdd(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Patch('/delete')
  @UseGuards(FirebaseAuthGuard)
  updateSlotWithDelete(
    @Query() query: any,
    @Body() dto: UpdateSlotWithDeleteDto
  ) {
    try {
      return this.service.updateSlotWithDelete(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  getSchedule(@Query('_id') id: string) {
    try {
      return this.service.getSchedule(id);
    } catch (err) {
      return err;
    }
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard)
  deleteSchedule(@Query('_id') id: string) {
    try {
      return this.service.deleteSchedule(id);
    } catch (err) {
      return err;
    }
  }

  @Get('/learn')
  @UseGuards(FirebaseAuthGuard)
  getLearnSchedules(@Query('studentId') studentId: string) {
    try {
      return this.service.getLearnSchedules(studentId);
    } catch (err) {
      return err;
    }
  }
}
