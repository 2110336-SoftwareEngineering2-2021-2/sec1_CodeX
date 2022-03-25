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
import { NewUserDto, UserDto } from './user.dto';
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
  @UseGuards(FirebaseAuthGuard)
  getProfile(@Query() query: any) {
    try {
      return this.service.getProfile(query._id, query.email);
    } catch (err) {
      return err;
    }
  }

  @Post('/create')
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: NewUserDto })
  createProfile(@Body() dto: UserDto) {
    try {
      return this.service.createProfile(dto);
    } catch (err) {
      return err;
    }
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  updateProfile(@Query('_id') id: string, @Body() dto: updateUserDto) {
    try {
      return this.service.updateProfile(id, dto);
    } catch (err) {
      return err;
    }
  }
}
