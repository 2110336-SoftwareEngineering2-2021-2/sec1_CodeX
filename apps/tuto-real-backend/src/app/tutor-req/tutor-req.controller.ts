import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TutorReqDto } from './tutor-req.dto';
import { TutorReqService } from './tutor-req.service';
import { updateStatusDto } from './updateStatus.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('TutorReq')
@Controller('tutorReq')
export class TutorReqController {
  constructor(private readonly service: TutorReqService) {}

  @Get()
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all requests' })
  @ApiResponse({ status: 200, description: 'Get all requests successfully' })
  getRequests() {
    try {
      return this.service.getRequests();
    } catch (err) {
      return err;
    }
  }

  @Post('create')
  @Roles('Student')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create request' })
  @ApiBody({ type: TutorReqDto })
  @ApiResponse({ status: 201, description: 'Create request succesfully' })
  @ApiResponse({ status: 400, description: 'Create request not succes' })
  @ApiResponse({ status: 404, description: 'User not found' })
  createRequest(@Body() dto: TutorReqDto) {
    try {
      return this.service.createRequest(dto);
    } catch (err) {
      return err;
    }
  }

  @Patch()
  @Roles('Admin')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update request status' })
  @ApiQuery({ name: '_id', required: true })
  @ApiBody({ type: updateStatusDto })
  @ApiResponse({ status: 201, description: 'Update request succesfully' })
  @ApiResponse({ status: 403, description: 'Can not connect Zoom API' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateStatus(@Query('_id') id: string, @Body() dto: updateStatusDto) {
    try {
      return this.service.updateStatus(id, dto);
    } catch (err) {
      return err;
    }
  }
}
