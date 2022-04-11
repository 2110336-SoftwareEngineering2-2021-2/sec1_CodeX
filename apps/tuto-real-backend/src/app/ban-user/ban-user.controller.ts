import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BanUserDto } from './ban-user.dto';
import { BanUserService } from './ban-user.service';

@ApiTags('BanUser')
@Controller('punishment')
export class BanUserController {
  constructor(private readonly banUserService: BanUserService) {}

  @Get()
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
  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({
    status: 200,
    description: 'Update successful',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  banUser(@Query('target_id') tid: string, @Body() dto: BanUserDto) {
    try {
      return this.banUserService.banUser(tid, dto.unBanDate);
    } catch (err) {
      return err;
    }
  }

  @Patch('unban')
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
