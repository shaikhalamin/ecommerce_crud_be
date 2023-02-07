import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async create() {
    // console.log(productVariantDto);
    // const { sizes = [], ...variantFields } = productVariantDto;
    // const variant = this.variantRepository.create(variantFields);
    // //  sizes.length > 0 &&
    // //       (variant.variantSizes = await this.storageFileService.findByIds(
    // //         propertyImages,
    // //       ));
    // return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
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

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
