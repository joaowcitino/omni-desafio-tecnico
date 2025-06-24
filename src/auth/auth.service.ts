import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SigninDto } from '../users/dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signinDto: SigninDto,
  ): Promise<{ token: string; expiresIn: string }> {
    const user = await this.usersService.validateUser(
      signinDto.username,
      signinDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: '1h',
    };
  }
}
