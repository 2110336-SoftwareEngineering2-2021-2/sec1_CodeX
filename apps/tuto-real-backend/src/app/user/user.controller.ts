import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService){}

   

    @Get(':id')
    GetProfileByID(@Param('id') id: String) {
        return this.service.GetProfileByID(id); 
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('img'))
    Create(@UploadedFile() file , @Body() dto:UserDto) {

        dto.role = "Student"
        dto.profileImg = {
            fileName :"default.jpg",
            url : "https://storage.cloud.google.com/code_x/ProfileImg/default.jpg"
        }
        return this.service.Create(dto);
      
    }
    



}
