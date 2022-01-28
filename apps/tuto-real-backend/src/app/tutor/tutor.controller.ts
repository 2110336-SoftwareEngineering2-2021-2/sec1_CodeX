import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Tutor } from './tutor.interface';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {

    constructor(private readonly service: TutorService){}

   

    @Get(':id')
    GetProfileByID(@Param('id') id: String) {
        return this.service.GetProfileByID(id); 
    }
    



}
