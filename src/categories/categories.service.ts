import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return new this.categoryModel(createCategoryDto).save();
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }
  async findAllArchived() {
    console.log('no ar');
    return this.categoryModel
      .find({ isArchived: { $in: ['true', true] } })
      .exec();
  }

  async findAllNonArchived() {
    console.log('ar');
    return this.categoryModel
      .find({ isArchived: { $in: ['false', false, undefined] } })
      .exec();
  }

  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto).exec();
  }

  async remove(_id: string) {
    return this.categoryModel.deleteOne({ _id }).exec();
  }
}
