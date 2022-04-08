import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReportService } from './report.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import {ReportDto} from './report.dto'
@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReport(@Query() q) {
    try{
      return this.reportService.getAll();
    }catch (err) {
      return err;
    }
  }

  @Post()
  create(@Body() dto:ReportDto) {
    try{
      return this.reportService.create(dto);
    }catch (err) {
      return err;
    }
  }


}
