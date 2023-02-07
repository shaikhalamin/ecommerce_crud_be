import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({
    description: 'The size of the product',
    example: 'EU-39',
  })
  @IsNotEmpty()
  name: string;
}
