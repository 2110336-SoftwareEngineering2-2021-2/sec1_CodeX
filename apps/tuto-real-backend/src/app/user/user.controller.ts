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
import { ApiTags,ApiBearerAuth,ApiResponse,ApiOperation,ApiBody, ApiQuery} from '@nestjs/swagger';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getProfile(@Query() query: any) {
    return this.service.getProfile(query._id, query.email);
  }

  @Post('/create')
  createProfile(@Body() dto: UserDto) {
    dto.profileImg = {
      url: 'https://storage.googleapis.com/codex_img/Profile/default.jpg',
    };
    return this.service.createProfile(dto);
  }

  @Patch()
  updateProfile(@Query('_id') id: string, @Body() dto: updateUserDto) {
    return this.service.updateProfile(id, dto);
  }
}
