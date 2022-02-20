import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './updateSchedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}
  @Post()
  createSchedule(@Query() query: any, @Body() dto: ScheduleDto) {
    return this.service.createSchedule(query._id, dto);
  }

  @Patch()
  updateSchedule(@Query() query: any, @Body() dto: UpdateScheduleDto) {
    return this.service.updateSchedule(query._id, dto);
  }
  @Get()
  getSchedule(@Query('_id') id: string) {
    return this.service.getSchedule(id);
  }
}
