import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparerMdps } from 'src/utils/bcrypt.utils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUserName(username);
    if (comparerMdps(pass, user?.motDePasse)) {
      const { motDePasse, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      userName: user?._doc?.userName,
      sub: user?._doc?._id,
      _id: user?._doc?._id,
      roles: user?._doc?.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: user?._doc,
    };
  }
}
