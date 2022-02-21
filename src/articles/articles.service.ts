import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './entities/article.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return new this.articleModel(createArticleDto).save();
  }

  findAllUne() {
    return this.articleModel.find({ isAlaUne: { $in: ['true', true] } }).exec();
  }
  findAllArchived() {
    return this.articleModel
      .find({ isArchived: { $in: ['true', true] } })
      .exec();
  }
  findAllNonArchived() {
    return this.articleModel
      .find({ isArchived: { $in: ['false', false, undefined] } })
      .exec();
  }

  findAll() {
    return this.articleModel.find().exec();
  }

  findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto).exec();
  }

  remove(_id: string) {
    return this.articleModel.deleteOne({ _id }).exec();
  }
}

export function isBooleen(val: string | undefined): boolean | undefined {
  return val?.toLowerCase() === 'false' ? undefined : true;
}
