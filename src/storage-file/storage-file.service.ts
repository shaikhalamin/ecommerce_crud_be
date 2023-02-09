import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStorageFileDto } from './dto/update-storage-file.dto';
import { StorageFile } from './entities/storage-file.entity';

@Injectable()
export class StorageFileService {
  constructor(
    @InjectRepository(StorageFile)
    private readonly storageFileRepository: Repository<StorageFile>,
  ) {}

  async create(file: Express.Multer.File) {
    const storageFile = this.storageFileRepository.create({
      fileName: file.filename,
      image_url: `http://localhost:8000/products/${file.filename}`,
    });

    return await this.storageFileRepository.save(storageFile);
  }

  findAll() {
    return `This action returns all storageFile`;
  }

  async findOne(id: number) {
    return await this.storageFileRepository.findOneBy({ id });
  }

  update(id: number, updateStorageFileDto: UpdateStorageFileDto) {
    return `This action updates a #${id} storageFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} storageFile`;
  }
}
