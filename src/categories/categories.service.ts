import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const author = await this.UserModel.findById(createCategoryDto?.auteur);
    return new this.categoryModel({
      ...createCategoryDto,
      author: [author],
    }).save();
  }

  async findAll() {
    return this.categoryModel.find().populate('author');
  }
  async findAllArchived() {
    return this.categoryModel
      .find({ isArchived: { $in: ['true', true] } })
      .exec();
  }

  async findAllNonArchived() {
    return this.categoryModel
      .find({ isArchived: { $in: ['false', false, undefined] } })
      .exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const author = await this.UserModel.findById(updateCategoryDto?.auteur);
    return await this.categoryModel
      .findByIdAndUpdate(id, { ...updateCategoryDto, author: [author] })
      .exec();
  }

  async remove(_id: string) {
    return this.categoryModel.deleteOne({ _id }).exec();
  }
}
