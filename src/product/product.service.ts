import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { VariantService } from './variant.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly variantService: VariantService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { variants = [], ...allFields } = createProductDto;
    const product = this.productRepository.create(allFields);

    if (variants.length > 0) {
      const variantsToSave = [];
      for await (const variant of variants) {
        const newProductVariant = await this.variantService.create(variant);
        variantsToSave.push(newProductVariant);
      }
      product.variant = variantsToSave;
    }

    return await this.productRepository.save(product);
  }

  // findAll() {
  //   return `This action returns all product`;
  // }

  async findAll(query: any) {
    try {
      const { page = 1, perPage = 10, order = {}, filters = {} } = query;
      // const queryFilters = await this.customFilter(filters);
      // console.log('filters', queryFilters);

      const [results, total] = await this.productRepository.findAndCount({
        relations: ['category', 'variant.variantSizes.size'],
        // where: {
        //   ...queryFilters,
        // },
        take: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage),
        order: order,
      });

      return {
        success: true,
        data: results,
        meta: {
          all_total: total,
          total: results.length,
          per_page: Number(perPage),
          page: Number(page),
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
