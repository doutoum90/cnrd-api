import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
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
    if (!user) {
      throw new UnauthorizedException("Nom d'utilisateur incorrecte");
    }
    if (!comparerMdps(pass, user?.motDePasse)) {
      throw new UnauthorizedException('Mot de passe incorrecte');
    }
    const { motDePasse, ...result } = user;

    const jwt = await this.jwtService.signAsync({ id: user['_id'] });
    return jwt;
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

  async getUserData(cookie: any){
    return await this.jwtService.verifyAsync(cookie);
  }

  /*public getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }*/
}
