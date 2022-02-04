import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService){}

   

    @Get(':email')
    GetProfileByMail(@Param('email') mail : String) {

        return this.service.GetProfileByMail(mail); 
    }

    @Post('/create')
    Create(@Body() dto:UserDto) {
        //console.log(dto)
        dto.role = "Student"
        dto.profileImg = {
            fileName :"default.jpg",
            url : "https://storage.googleapis.com/code_x/ProfileImg/default.jpg"
        }
        return this.service.Create(dto);
      
    }
    



}
