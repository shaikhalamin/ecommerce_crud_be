import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { ProductVariantDto } from './product-variant.dto';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Men T-Shirt',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 79.89,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 45,
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Comfortable cotton fabrics',
  })
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Premium Collection',
  })
  @IsOptional()
  @IsNotEmpty()
  collection: string;

  @ApiProperty({
    description: 'The video link of the product',
    example: 'http://videolink.com/videoes/v/45893478834384989',
  })
  @IsOptional()
  @IsNotEmpty()
  videoUrlLink: string;

  @ApiProperty({
    description: 'Category of the product',
    example: 1,
  })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    description: 'Image of the product',
    example: 1,
  })
  @IsNotEmpty()
  storageFileId: number;

  @ApiProperty({
    description: 'Variants of the product',
    isArray: true,
    type: ProductVariantDto,
  })
  @Type(() => ProductVariantDto)
  @ValidateNested({ each: true })
  @IsOptional()
  @IsNotEmpty()
  variants: Array<ProductVariantDto>;
}
