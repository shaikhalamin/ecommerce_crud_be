import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductVariantDto } from './dto/product-variant.dto';
import { VariantSize } from './entities/variant-size.entity';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(VariantSize)
    private readonly variantSizeRepository: Repository<VariantSize>,
  ) {}

  async create(productVariantDto: ProductVariantDto) {
    const { sizes = [], ...variantFields } = productVariantDto;
    const variant = this.variantRepository.create(variantFields);
    const savedVariant = await this.variantRepository.save(variant);
    sizes.length > 0 && (await this.setVariantSize(sizes, savedVariant));

    return savedVariant;
  }

  async setVariantSize(sizes: number[], savedVariant: Variant) {
    try {
      for await (const sizeId of sizes) {
        const variantSizesInit = this.variantSizeRepository.create({
          sizeId: sizeId,
          variantId: savedVariant.id,
        });
        await this.variantSizeRepository.save(variantSizesInit);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
