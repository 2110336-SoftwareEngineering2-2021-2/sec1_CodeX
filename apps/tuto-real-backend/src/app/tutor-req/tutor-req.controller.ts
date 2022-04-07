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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { uploadImage } from '../util/google';
//import { ExpressAdapter, FileInterceptor  } from '@nestjs/platform-express';
import { CreateTutorReq, ShowTutorReq, TutorReqDto } from './tutor-req.dto';
import { TutorReqService } from './tutor-req.service';
import { updateStatusDto } from './updateStatus.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('TutorReq')
@Controller('tutorReq')
export class TutorReqController {
  constructor(private readonly service: TutorReqService) {}

  @Post('create')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create request' })
  @ApiBody({ type: CreateTutorReq })
  @ApiResponse({ status: 201 })
  create1(@Body() dto: TutorReqDto) {
    try {
      return this.service.create1(dto);
    } catch (err) {
      return err;
    }
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get all request' })
  @ApiResponse({ status: 201, type: ShowTutorReq })
  findAll() {
    try {
      return this.service.findAll();
    } catch (err) {
      return err;
    }
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  update(@Query('_id') id: string, @Body() dto: updateStatusDto) {
    try {
      return this.service.updateStatus(id, dto);
    } catch (err) {
      return err;
    }
  }

  
  @Post()
  genZoom(){
    this.service.genZoom();
  }
}
