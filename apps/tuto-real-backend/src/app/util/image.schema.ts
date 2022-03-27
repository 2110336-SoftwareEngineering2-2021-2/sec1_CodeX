import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const ImgSchema = new mongoose.Schema({
  fileName: String,
  url: String,
});

export class ProfileImg {
  @ApiProperty()
  url: String;
}
