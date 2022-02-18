import { Body, Controller, Post, Query } from '@nestjs/common';
import { ScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly service: ScheduleService){}
    @Post('/create')
    createSchedule(@Query('_id') id: string, @Body() dto: ScheduleDto){
        return this.service.createSchedule(id, dto);
    }
}
