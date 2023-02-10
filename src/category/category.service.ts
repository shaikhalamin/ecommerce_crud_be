import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onApplicationBootstrap() {
    await this.insertCategories();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.categoryRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      let category = await this.findOne(id);
      if (!category) {
        throw new NotFoundException('Category not found !');
      }
      category = Object.assign(category, {
        ...updateCategoryDto,
      });
      return this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  async insertCategories() {
    const categories = [
      { name: 'Men Full-Shirt' },
      { name: 'Women Pajamas' },
      { name: 'Baby Dress' },
    ];

    for await (const category of categories) {
      const categoryEntry = this.categoryRepository.create(category);
      this.categoryRepository.save(categoryEntry);
    }
  }
}
