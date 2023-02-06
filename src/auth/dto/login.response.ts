import { UserResponseDto } from '@/user/dto/user-respose.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @Expose()
  @ApiProperty()
  access_token: string;

  @Expose()
  @ApiProperty()
  refresh_token: string;

  @Expose()
  @ApiProperty({
    type: () => UserResponseDto,
  })
  user: UserResponseDto;

  @Expose()
  @ApiProperty()
  expires_at: number;
}
