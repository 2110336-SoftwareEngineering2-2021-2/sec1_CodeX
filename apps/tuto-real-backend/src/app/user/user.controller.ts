import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { updateUserDto } from './updateUser.dto';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':email')
  getProfileByMail(@Param('email') email: String) {
    return this.service.getProfileByMail(email);
  }

  @Post('/create')
  createProfile(@Body() dto: UserDto) {
    dto.profileImg = {
      url: 'https://storage.googleapis.com/codex_img/Profile/default.jpg',
    };
    return this.service.createProfile(dto);
  }

  @Patch(':email')
  updateProfile(@Param('email') email: string, @Body() dto: updateUserDto) {
    return this.service.updateProfile(email, dto);
  }
}
