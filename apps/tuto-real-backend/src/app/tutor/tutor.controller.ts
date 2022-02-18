import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TutorReqDto } from '../tutor-req/tutor-req.dto';
import { UserDto } from '../user/user.dto';
import { User } from '../user/user.interface';
import { sendMail } from '../util/google';
import { CriteriaDto } from './cirteria.dto';
import { TutorService } from './tutor.service';

@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Get()
  getTutor() {
    return this.tutorService.getTutor();
  }

  @Get("/search")
  searchTutor(@Query() q) {
    var dto = new CriteriaDto()
    console.log(q,dto)
    dto.subjects = (!!q.subjects)? q.subjects.split(","):undefined
    if (!!q.ratePrice){
      var price = q.ratePrice.split(",")
      dto.rate.min = parseInt(price[0])
      if(!!price[1]) dto.rate.max = parseInt(price[1])
    }
    dto.keyword = (!!q.keyword)? q.keyword.split(" "):undefined
    dto.days = (!!q.days)? q.days.split(","):undefined
    return this.tutorService.searchTutor(dto);
  }

  @Get("/send")
  sendMail(){
    return this.tutorService.send()

  }

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
