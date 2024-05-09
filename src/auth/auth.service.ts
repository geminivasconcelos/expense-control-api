import { UserService } from './../user/user.service';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import { UserListDTO } from 'src/user/dto/UserList.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  
  async signIn(email: string, pass: string) {
    const user = await this.userService.singleListLogin(email, pass);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async gerarToken(payload: UserListDTO) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: 'topSecret512',
          expiresIn: '50s',
        },
      ),
    };
  }

  async checkToken(){

  }
}
