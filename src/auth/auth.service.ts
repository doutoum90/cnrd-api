import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUserName(username);
    if (user && user.motDePasse === pass) {
      const { motDePasse, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user?._doc?.userName, sub: user?._doc?._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: user?._doc,
    };
  }
}
