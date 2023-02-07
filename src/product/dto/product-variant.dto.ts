import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductVariantDto {
  @ApiProperty({
    description: 'The name of the variant',
    example: 'Variant - 1',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Different size of the product',
    example: [1, 2],
  })
  @IsOptional()
  @IsNotEmpty()
  sizes: number[];
}
