import { Body, Controller, Get, Post } from '@nestjs/common';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReqService } from './tutor-req.service';

@Controller('tutor-req')
export class TutorReqController {

    constructor(private readonly service: TutorReqService){}

    @Post('create')
    create(@Body() dto:TutorReqDto){
        dto.timeStamp = new Date();
        return this.service.create(dto);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }
}
