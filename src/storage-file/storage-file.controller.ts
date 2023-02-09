import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StorageFileService } from './storage-file.service';
import { UpdateStorageFileDto } from './dto/update-storage-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Storage File')
@Controller('storage-file')
export class StorageFileController {
  constructor(private readonly storageFileService: StorageFileService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('fileName', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req: Request, file: Express.Multer.File, cb: any) => {
          const randomName = uuidv4();
          const fileName = `${Date.now()}time${randomName
            .split('-')
            .join('')}${extname(file.originalname)}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    return this.storageFileService.create(file);
  }

  @Get()
  findAll() {
    return this.storageFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStorageFileDto: UpdateStorageFileDto,
  ) {
    return this.storageFileService.update(+id, updateStorageFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageFileService.remove(+id);
  }
}
