import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Variant } from './entities/variant.entity';
import { Size } from './entities/size.entity';
import { VariantSize } from './entities/variant-size.entity';
import { VariantService } from './variant.service';
import { SizeService } from './size.service';
import { StorageFileModule } from '@/storage-file/storage-file.module';
import { CategoryModule } from '@/category/category.module';
import { SizeController } from './size.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Variant, Size, VariantSize]),
    StorageFileModule,
    CategoryModule,
  ],
  controllers: [ProductController, SizeController],
  providers: [ProductService, VariantService, SizeService],
})
export class ProductModule {}
