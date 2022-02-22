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
import { CriteriaDto, CriteriaQuery, resultDto } from './cirteria.dto';
import { TutorService } from './tutor.service';
import { ApiTags,ApiBearerAuth,ApiResponse,ApiOperation,ApiBody, ApiQuery} from '@nestjs/swagger';

@ApiTags('Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  
  @Get("/search")
  @ApiOperation({ summary: 'Search tutor' })
  @ApiQuery({
    description: 'Criteria',
    type:CriteriaQuery,
  })
  @ApiResponse({
    status : 200 ,
    type : resultDto
  })
  searchTutor(@Query() q) {
    var dto = new CriteriaDto()
    //console.log(q,dto)
    dto.subjects = (!!q.subjects)? q.subjects.split(","):undefined
    if (!!q.ratePrice){
      var price = q.ratePrice.split(",")
      dto.rate.min = parseInt(price[0])
      if(!!price[1]) dto.rate.max = parseInt(price[1])
    }
    dto.keyword = (!!q.keyword)? q.keyword.split(","):undefined
    dto.days = (!!q.days)? q.days.split(","):undefined
    return this.tutorService.searchTutor(dto);
  }
  
  @Get("/send")
  sendMail(){
    return this.tutorService.send()

  }

}
