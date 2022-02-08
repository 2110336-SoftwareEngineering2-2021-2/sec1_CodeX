import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.interface';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {
  constructor(private readonly service: TutorService) {}

  /*@Get(':id')
    GetProfileByID(@Param('id') id: String) {
        return this.service.GetProfileByID(id); 
    }*/

  /*@Post()
    @UseInterceptors(FileInterceptor('img'))
    UploadImage(@UploadedFile() file , @Body() dto:UserDto) {
        //if (typeof (dto.subjects) == "string")
           // dto.subjects = 
        console.log(dto, file)
        //const fileB64 = file.buffer.toString('base64')
        dto.profileImg = { "name" : file.originalname , "data" : file.buffer , "type" : file.mimetype}
        return this.service.UploadImage(dto);
      
    }*/
}
