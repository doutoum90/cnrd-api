import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparerMdps, encrpterMdp } from 'src/utils/bcrypt.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async all(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(data): Promise<User> {
    return new this.userModel({
      ...data,
      motDePasse: encrpterMdp(data?.motDePasse),
    }).save();
  }

  async getUser(_id: string): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async getUserByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({ userName }).exec();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<any> {
    return this.userModel.findByIdAndUpdate(id, data).exec();
  }

  async updateUserPassword(id: string, data: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);
    const hash = encrpterMdp(data?.oldPassword);
    if (comparerMdps(data?.motDePasse, user?.motDePasse)) {
      delete data.oldPassword;
      this.updateUser(id, { ...data, motDePasse: hash });
    } else {
      throw new HttpException(
        'Le mot de passe saisi ne correspond pas à votre mot de passe',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteUser(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
