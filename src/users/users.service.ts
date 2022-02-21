import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    return new this.userModel(data).save();
  }

  async getUser(_id: number): Promise<User> {
    return this.userModel.findById(_id).exec();
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<any> {
    this.userModel.findByIdAndUpdate(id, data);
  }

  async deleteUser(id: number): Promise<any> {
    return this.userModel.findByIdAndDelete(id);
  }
}
