import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The firstName of the user',
    example: 'Md',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The lastName of the user',
    example: 'Ibrahim',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email of the User',
    example: 'ibrahim@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'ibrahim@123!@',
  })
  @IsNotEmpty()
  password: string;
}
