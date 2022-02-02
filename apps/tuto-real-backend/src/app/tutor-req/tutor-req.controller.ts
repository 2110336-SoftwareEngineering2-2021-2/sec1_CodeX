import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { uploadImage } from '../util/google';
//import { ExpressAdapter, FileInterceptor  } from '@nestjs/platform-express';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReqService } from './tutor-req.service';




@Controller('tutorReq')
export class TutorReqController {

    constructor(private readonly service: TutorReqService){}

    @Post('create')
    @UseInterceptors(FilesInterceptor('evidenceImg'))
    create(@UploadedFiles() files , @Body() dto:TutorReqDto){
 
        dto.timeStamp = new Date();
        return this.service.create(files,dto);

    }

    @Get()
    findAll(){
        return this.service.findAll();
    }
}
