import { CategoryService } from '@/category/category.service';
import { StorageFileService } from '@/storage-file/storage-file.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly storageFileService: StorageFileService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { variants = [], ...allFields } = createProductDto;
    const product = this.productRepository.create(allFields);
    product.slug = product.name.toLocaleLowerCase().split(' ').join('-');

    if (createProductDto.categoryId) {
      product.category = await this.categoryService.findOne(
        createProductDto.categoryId,
      );
    }

    if (createProductDto.storageFileId) {
      product.productImage = await this.storageFileService.findOne(
        createProductDto.storageFileId,
      );
    }

    if (variants.length > 0) {
      const variantsToSave = [];
      for await (const variant of variants) {
        const newProductVariant = await this.variantService.create(variant);
        variantsToSave.push(newProductVariant);
      }
      product.variants = variantsToSave;
    }

    return await this.productRepository.save(product);
  }

  async findAll(query: any) {
    try {
      const { page = 1, perPage = 10, order = {}, filters = {} } = query;
      // const queryFilters = await this.customFilter(filters);
      // console.log('filters', queryFilters);

      const [results, total] = await this.productRepository.findAndCount({
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          description: true,
          status: true,
          quantity: true,
          category: {
            id: true,
            name: true,
          },
          variants: {
            id: true,
            name: true,
            variantSizes: {
              id: true,
              size: {
                id: true,
                name: true,
              },
            },
          },
          productImage: {
            id: true,
            image_url: true,
          },
        },
        relations: ['category', 'variants.variantSizes.size', 'productImage'],
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

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({
        relations: ['category', 'variants.variantSizes.size', 'productImage'],
        where: { id: id },
      });
      if (!product) {
        throw new NotFoundException('Product with id not found !');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      let product = await this.findOne(id);
      if (!product) {
        throw new NotFoundException('Category not found !');
      }
      product = Object.assign(product, {
        ...updateProductDto,
      });

      if (updateProductDto.categoryId) {
        product.category = await this.categoryService.findOne(
          updateProductDto.categoryId,
        );
      }

      if (updateProductDto.storageFileId) {
        product.productImage = await this.storageFileService.findOne(
          updateProductDto.storageFileId,
        );
      }

      if (updateProductDto.variants.length > 0) {
        const variantsToSave = [];
        for await (const variant of updateProductDto.variants) {
          const newProductVariant = await this.variantService.create(variant);
          variantsToSave.push(newProductVariant);
        }
        product.variants = variantsToSave;
      }

      return this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async remove(id: number) {
    try {
      return await this.productRepository.remove(await this.findOne(id));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
