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

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getProfileByMail(@Query('email') email: String) {
    return this.service.getProfileByMail(email);
  }

  @Get()
  getProfileByID(@Query('id') id: String) {
    return this.service.getProfileByID(id);
  }

  @Post('/create')
  createProfile(@Body() dto: UserDto) {
    dto.profileImg = {
      url: 'https://storage.googleapis.com/codex_img/Profile/default.jpg',
    };
    return this.service.createProfile(dto);
  }

  @Patch()
  updateProfile(@Query('id') id: string, @Body() dto: updateUserDto) {
    return this.service.updateProfile(id, dto);
  }
}
