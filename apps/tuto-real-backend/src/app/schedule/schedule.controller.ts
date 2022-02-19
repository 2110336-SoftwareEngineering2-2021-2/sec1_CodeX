import { Body, Controller,Get, Post, Query } from '@nestjs/common';
import { ScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly service: ScheduleService){}

    @Get()
    getSchedule(@Query('_id') id: string){
        return this.service.getSchedule(id)
    }

    @Post()
    createSchedule(@Query() query: any, @Body() dto: ScheduleDto){
        return this.service.createSchedule(query._id, dto);
    }
}
