import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { Size } from './entities/size.entity';

@Injectable()
export class SizeService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async onApplicationBootstrap() {
    await this.insertSizes();
  }

  async create(createSizeDto: CreateSizeDto) {
    try {
      const size = this.sizeRepository.create(createSizeDto);
      return await this.sizeRepository.save(size);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll(query: any) {
    return this.sizeRepository.find({});
  }

  findOne(id: number) {
    return this.sizeRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]) {
    try {
      return await this.sizeRepository.find({
        where: { id: In([...ids]) },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateSizeDto: UpdateSizeDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async insertSizes() {
    const sizes = [{ name: 'EU-44' }, { name: 'EU-38' }, { name: 'EU-48' }];
    for await (const size of sizes) {
      const sizeEntry = this.sizeRepository.create(size);
      this.sizeRepository.save(sizeEntry);
    }
  }
}
