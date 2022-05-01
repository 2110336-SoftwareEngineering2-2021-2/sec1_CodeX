import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { CreateReportDto } from './report.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all report' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully queried.',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong Id format',
  })
  getAllReport(@Query('_id') _id: string) {
    try {
      return this.reportService.getAll(_id);
    } catch (err) {
      return err;
    }
  }

  @Post()
  @Roles('Student', 'Tutor')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create report' })
  @ApiResponse({
    status: 200,
    description: 'The report has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong report format!',
  })
  @ApiResponse({
    status: 404,
    description: 'Target or reporter not found',
  })
  @ApiBody({ type: CreateReportDto })
  create(@Body() dto: CreateReportDto) {
    try {
      return this.reportService.create(dto);
    } catch (err) {
      return err;
    }
  }

  @Delete()
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update report status' })
  @ApiOperation({ summary: 'Delete report' })
  @ApiResponse({
    status: 200,
    description: 'Update successful!',
  })
  @ApiResponse({
    status: 404,
    description: 'Report not found.',
  })
  deleteReport(@Query('_id') _id: string) {
    try {
      return this.reportService.updateReportStatus(_id, false);
    } catch (err) {
      return err;
    }
  }
}
