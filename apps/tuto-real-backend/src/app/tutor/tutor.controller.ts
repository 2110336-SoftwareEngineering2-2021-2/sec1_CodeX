import { Controller, Get, Query } from '@nestjs/common';
import { CriteriaDto, CriteriaQuery, resultDto } from './criteria.dto';
import { TutorService } from './tutor.service';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  /*@Get()
  @ApiOperation({ summary: 'Get all tutors' })
  @ApiResponse({ status: 200, description: 'Get all tutors successfully' })
  getTutor() {
    try {
      return this.tutorService.getTutor();
    } catch (err) {
      return err;
    }
  }*/

  @Get('search')
  @ApiOperation({ summary: 'Search tutor' })
  @ApiQuery({
    description: 'Criteria',
    type: CriteriaQuery,
  })
  @ApiResponse({
    status: 200,
    type: resultDto,
  })
  searchTutor(@Query() query: any) {
    var dto = new CriteriaDto();
    dto.subjects = !!query.subjects ? query.subjects.split(',') : undefined;
    if (!!query.ratePrice) {
      var price = query.ratePrice.split(',');
      dto.rate.min = parseInt(price[0]);
      if (!!price[1]) dto.rate.max = parseInt(price[1]);
    }
    dto.keyword = !!query.keyword ? query.keyword.split(',') : undefined;
    dto.days = !!query.days ? query.days.split(',') : undefined;

    try {
      return this.tutorService.searchTutor(dto);
    } catch (err) {
      return err;
    }
  }
}
