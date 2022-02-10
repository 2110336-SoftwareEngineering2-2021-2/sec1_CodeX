import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateUserDto } from './updateUser.dto';
import { UserDto } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':email')
  GetProfileByMail(@Param('email') mail: String) {
    return this.service.GetProfileByMail(mail);
  }

  @Post('/create')
  Create(@Body() dto: UserDto) {
    dto.role = 'Student';
    dto.profileImg = {
      url: 'https://storage.googleapis.com/codex_img/Profile/default.jpg',
    };
    return this.service.Create(dto);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() dto: updateUserDto) {
    return this.service.updateProfile(email, dto);
  }

 
}
