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

@ApiTags("TutorReq")
@Controller('tutorReq')
export class TutorReqController {
  constructor(private readonly service: TutorReqService) {}


  @ApiOperation({ summary: 'Create request' })
  @ApiBody({type:CreateTutorReq})
  @ApiResponse({ status : 201 })
  @Post('create')
  create1(@Body() dto: TutorReqDto) {
    try {
    return this.service.create1(dto);
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Get all request' })
  @ApiResponse({ status : 201 , type : ShowTutorReq})
  @Get()
  findAll() {
    try {
      return this.service.findAll();
    } catch (err) {
      return err;
    }
  }

  @Patch()
  update(@Query('_id') id: string, @Body() dto: updateStatusDto) {
    try {
      return this.service.updateStatus(id, dto);
    } catch (err) {
    return err;
    }
  }


}
