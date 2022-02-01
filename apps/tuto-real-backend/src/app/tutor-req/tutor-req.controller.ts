import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
//import { ExpressAdapter, FileInterceptor  } from '@nestjs/platform-express';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReqService } from './tutor-req.service';




@Controller('tutorReq')
export class TutorReqController {

    constructor(private readonly service: TutorReqService){}

    @Post('create')
    @UseInterceptors(FilesInterceptor('evidenceImg'))
    create(@UploadedFiles() files , @Body() dto:TutorReqDto){
        dto.evidenceImg = [{ "name" : files[0].originalname ,
        "data" : files[0].buffer ,
         "type" : files[0].mimetype}]
        for (let i=1;i<files.length;i++){
     
            dto.evidenceImg.push({
                "name" : files[i].originalname ,
                 "data" : files[i].buffer ,
                  "type" : files[i].mimetype
            })
     
        }
        dto.timeStamp = new Date();
        return this.service.create(dto);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }
}
