import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { uploadImage } from '../util/google';
//import { ExpressAdapter, FileInterceptor  } from '@nestjs/platform-express';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReqService } from './tutor-req.service';
import { updateStatusDto } from './updateStatus.dto';

@Controller('tutorReq')
export class TutorReqController {
  constructor(private readonly service: TutorReqService) {}

  @Post('create1')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'citizenID', maxCount: 1 },
      { name: 'transcription', maxCount: 1 },
    ])
  )
  create(@UploadedFiles() files, @Body() dto: TutorReqDto) {
    return this.service.create(files.citizenID, files.transcription, dto);
  }

  @Post('create')
  create1(@Body() dto: TutorReqDto) {
    return this.service.create1(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch()
  update(@Query('_id') id: string, @Body() dto: updateStatusDto) {
    return this.service.updateStatus(id, dto);
  }
}
