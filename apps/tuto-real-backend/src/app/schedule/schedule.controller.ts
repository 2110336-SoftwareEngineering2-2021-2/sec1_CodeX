import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleDto } from './schedule.dto';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './updateSchedule.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UpdateSlotWithDeleteDto } from './updateSlotWithDelete.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create the schedule' })
  @ApiCreatedResponse({
    description: 'The schedule has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'The schedule cannot be created.' })
  @ApiBody({ type: ScheduleDto })
  @ApiQuery({ name: '_id', description: 'Enter the tutor ID' })
  createSchedule(@Query() query: any, @Body() dto: ScheduleDto) {
    try {
      return this.service.createSchedule(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Patch('/add')
  //@UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Add slot to teach' })
  @ApiOkResponse({ description: 'The slots are added' })
  @ApiNotFoundResponse({ description: 'The schedule is not found' })
  @ApiQuery({ name: '_id', description: 'Enter the schedule ID' })
  updateSlotWithAdd(@Query() query: any, @Body() dto: UpdateScheduleDto) {
    try {
      return this.service.updateSlotWithAdd(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Patch('/delete')
  //@UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Delete slot to teach' })
  @ApiOkResponse({ description: 'The slots are deleted' })
  @ApiNotFoundResponse({ description: 'The schedule is not found' })
  @ApiQuery({ name: '_id', description: 'Enter the schedule ID' })
  updateSlotWithDelete(
    @Query() query: any,
    @Body() dto: UpdateSlotWithDeleteDto
  ) {
    try {
      return this.service.updateSlotWithDelete(query._id, dto);
    } catch (err) {
      return err;
    }
  }

  @Get()
  //@UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get tutor schedule' })
  @ApiOkResponse({ description: 'Get all schedule successfully' })
  @ApiNotFoundResponse({ description: 'Tutor is not found or has no schedule' })
  @ApiQuery({ name: '_id', description: 'Please enter the tutor ID' })
  getSchedule(@Query() id: string) {
    try {
      return this.service.getSchedule(id);
    } catch (err) {
      return err;
    }
  }

  @Get('/learn')
  @UseGuards(FirebaseAuthGuard)
  getLearnSchedules(@Query('studentId') studentId: string) {
    try {
      return this.service.getLearnSchedules(studentId);
    } catch (err) {
      return err;
    }
  }
}
