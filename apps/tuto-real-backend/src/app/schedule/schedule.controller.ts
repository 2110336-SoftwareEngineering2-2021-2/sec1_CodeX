import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
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

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}
  @Post()
  createSchedule(@Query() query: any, @Body() dto: ScheduleDto) {
    try {
      return this.service.createSchedule(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Patch('/add')
  updateSlotWithAdd(@Query() query: any, @Body() dto: UpdateScheduleDto) {
    try {
      return this.service.updateSlotWithAdd(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Patch('/delete')
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
  getSchedule(@Query('_id') id: string) {
    try {
      return this.service.getSchedule(id);
    } catch (err) {
      return err;
    }
  }
  @Delete()
  deleteSchedule(@Query('_id') id: string) {
    try {
      return this.service.deleteSchedule(id);
    } catch (err) {
      return err;
    }
  }

  @Get('/learn')
  getLearnSchedules(@Query('studentId') studentId : string){
    try {
      return this.service.getLearnSchedules(studentId);
    } catch (err) {
      return err;
    }
  }
}
