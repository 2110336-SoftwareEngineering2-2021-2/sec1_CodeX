import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { updateUserDto } from './updateUser.dto';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getProfile(@Query() query: any) {
    try {
      return this.service.getProfile(query._id, query.email);
    } catch (err) {
      return err;
    }
  }

  @Post('/create')
  createProfile(@Body() dto: UserDto) {
    try {
      return this.service.createProfile(dto);
    } catch (err) {
      return err;
    }
  }

  @Patch()
  updateProfile(@Query('_id') id: string, @Body() dto: updateUserDto) {
    try {
      return this.service.updateProfile(id, dto);
    } catch (err) {
      return err;
    }
  }
}
