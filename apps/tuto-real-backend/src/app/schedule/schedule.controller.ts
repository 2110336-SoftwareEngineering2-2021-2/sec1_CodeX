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
import { ApiTags,ApiBearerAuth,ApiResponse,ApiOperation,ApiBody, ApiQuery} from '@nestjs/swagger';

@ApiTags("Schedule")
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

  @Patch()
  updateSchedule(@Query() query: any, @Body() dto: UpdateScheduleDto) {
    try {
      return this.service.updateSchedule(query._id, dto);
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
}
