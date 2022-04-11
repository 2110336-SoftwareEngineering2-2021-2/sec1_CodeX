import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import {CreateReportDto, UpdateReportDto} from './report.dto'
@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get all report' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully queried.',
  })
  getAllReport() {
    try {
      return this.reportService.getAll();
    } catch (err) {
      return err;
    }
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create report' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong report format!',
  })
  @ApiBody({ type: CreateReportDto })
  create(@Body() dto: CreateReportDto) {
    try {
      return this.reportService.create(dto);
    } catch (err) {
      return err;
    }
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update report status' })
  @ApiResponse({
    status: 200,
    description: 'Update successful!',
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong request format',
  })
  @ApiBody({
    type: UpdateReportDto,
  })
  updateReportStatus(
    @Query('report_id') report_id: string,
    @Body() dto: UpdateReportDto
  ) {
    try {
      return this.reportService.updateReportStatus(report_id, dto.isBan);
    } catch (err) {
      return err;
    }
  }
}
