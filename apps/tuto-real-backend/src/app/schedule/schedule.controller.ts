import { Body, Controller, Post, Query } from '@nestjs/common';
import { ScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly service: ScheduleService){}
    @Post()
    createSchedule(@Query() query: any, @Body() dto: ScheduleDto){
        return this.service.createSchedule(query._id, dto);
    }
    
}
