import { Controller, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BanUserService } from './ban-user.service';

@ApiTags('BanUser')
@Controller('punishment')
export class BanUserController {
    constructor(private readonly service: BanUserService) {}
    
  @Patch('/ban')
  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({
    status: 200,
    description: 'Update successful!',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'UserId is wrong format',
  })
  ban(@Query("userId") userId : string) {
    console.log(userId)
  }

  @Patch('/unban')
  @ApiOperation({ summary: 'Unban user' })
  @ApiResponse({
    status: 200,
    description: 'Update successful!',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'UserId is wrong format',
  })
  unban(@Query('userId') userId : string) {
   console.log(userId)
  }


}

