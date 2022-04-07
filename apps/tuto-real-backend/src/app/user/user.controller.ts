import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { updateUserDto } from './updateUser.dto';
import { NewUserDto } from './user.dto';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiQuery({ name: '_id', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiResponse({ status: 200, description: 'Get user profile succesfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getProfile(@Query('_id') id: string, @Query('email') email: string) {
    try {
      return this.service.getProfile(id, email);
    } catch (err) {
      return err;
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: NewUserDto })
  @ApiResponse({ status: 201, description: 'Create user profile succesfully' })
  @ApiResponse({ status: 400, description: 'Create user profile not success' })
  createProfile(@Body() dto: NewUserDto) {
    try {
      return this.service.createProfile(dto);
    } catch (err) {
      return err;
    }
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiQuery({ name: '_id', required: true })
  @ApiBody({ type: updateUserDto })
  @ApiResponse({ status: 200, description: 'Update user profile succesfully' })
  @ApiResponse({ status: 400, description: 'Create user profile not success' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateProfile(@Query('_id') id: string, @Body() dto: updateUserDto) {
    try {
      return this.service.updateProfile(id, dto);
    } catch (err) {
      return err;
    }
  }
}
