import { ApiProperty } from '@nestjs/swagger';

export class updateStatusDto {
  @ApiProperty()
  readonly status: String;
}
