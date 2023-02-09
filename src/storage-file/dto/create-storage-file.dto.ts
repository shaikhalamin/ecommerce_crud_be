import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStorageFileDto {
  //   @IsNotEmpty()
  //   type: string;

  //   @IsOptional()
  //   @IsNotEmpty()
  //   size: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  fileName: Express.Multer.File;
}
