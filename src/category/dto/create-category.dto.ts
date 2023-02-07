import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Men T-Shirt',
  })
  @IsNotEmpty()
  name: string;
}
