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
    return this.articleModel.create(createArticleDto);
  }

  findAll() {
    return this.articleModel.find();
  }

  findOne(id: string) {
    return this.articleModel.findById(id);
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto);
  }

  remove(_id: string) {
    return this.articleModel.deleteOne({ _id });
  }
}
