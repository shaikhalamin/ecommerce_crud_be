import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as ms from 'ms';
import { RequestUser } from './type/request-user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
    expires_at: number;
  }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = {
      userId: user.id,
    };
    return {
      access_token: this.getAccessToken(payload),
      refresh_token: this.getRefreshToken(payload),
      user: user,
      expires_at: this.getTokenExpireAt(),
    };
  }

  async refreshTokens(user: RequestUser): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
    expires_at: number;
  }> {
    const userInfo = await this.userService.findOne(user.userId);
    if (!userInfo) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    delete userInfo.password;
    const payload = {
      userId: user.userId,
    };
    return {
      access_token: this.getAccessToken(payload),
      refresh_token: this.getRefreshToken(payload),
      user: userInfo,
      expires_at: this.getTokenExpireAt(),
    };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException('Invalid email or password !');
    }
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    delete user.password;
    return user;
  }

  getAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'accessTokenSecret',
      expiresIn: '3m',
    });
  }

  getRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'refreshTokenSecret',
      expiresIn: '30d',
    });
  }

  getTokenExpireAt(): number {
    const expireAt = Date.now() + ms('2m');
    return expireAt;
  }
}
