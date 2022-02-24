import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './entities/article.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from 'src/paginate.models';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return new this.articleModel(createArticleDto).save();
  }

  async findByKeyWord(searchQuery: string, pagination: Pagination) {
    const arts = await this.articleModel
      .find({
        $text: {
          $search: searchQuery || '',
        },
      })
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1));
    return arts;
  }

  findAllUne(pagination: Pagination) {
    return this.articleModel
      .find({ isAlaUne: { $in: ['true', true] } })
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1));
  }
  findAllArchived(pagination: Pagination) {
    return this.articleModel
      .find({ isArchived: { $in: ['true', true] } })
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1))
      .exec();
  }
  findAllNonArchived(pagination: Pagination) {
    return this.articleModel
      .find({ isArchived: { $in: ['false', false, undefined] } })
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1))
      .exec();
  }

  findAll(pagination: Pagination) {
    return this.articleModel
      .find()
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1))
      .exec();
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
