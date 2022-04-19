import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { ReportService } from '../report/report.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { BanUserDto } from './ban-user.dto';
import { BanUserService } from './ban-user.service';

@ApiTags('BanUser')
@Controller('punishment')
export class BanUserController {
  constructor(
    private readonly banUserService: BanUserService,
    @Inject(ReportService) private readonly service: ReportService
  ) {}

  @Get()
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get banned user' })
  @ApiResponse({
    status: 200,
    description: 'Get all banned user successful',
  })
  getBannedUser() {
    try {
      return this.banUserService.getBannedUser();
    } catch (err) {
      return err;
    }
  }

  @Patch('ban')
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({
    status: 200,
    description: 'Update successful',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBody({
    type: BanUserDto,
  })
  banUser(@Query('target_id') tid: string, @Body() dto: BanUserDto) {
    try {
      return this.banUserService.banUser(tid, dto.duration, dto.reportId);
    } catch (err) {
      return err;
    }
  }

  @Patch('unban')
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Unban user' })
  @ApiResponse({
    status: 200,
    description: 'Update successful',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  unban(@Query('target_id') tid: string) {
    try {
      return this.banUserService.unBanUser(tid);
    } catch (err) {
      return err;
    }
  }
}
