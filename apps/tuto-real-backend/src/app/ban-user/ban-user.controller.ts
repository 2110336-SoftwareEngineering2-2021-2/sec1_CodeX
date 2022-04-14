import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { BanUserDto } from './ban-user.dto';
import { BanUserService } from './ban-user.service';

@ApiTags('BanUser')
@Controller('punishment')
export class BanUserController {
  constructor(private readonly banUserService: BanUserService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
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
  //@UseGuards(FirebaseAuthGuard)
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
      return this.banUserService.banUser(tid, dto.duration);
    } catch (err) {
      return err;
    }
  }

  @Patch('unban')
  //@UseGuards(FirebaseAuthGuard)
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
