import { Injectable } from '@nestjs/common';
import { CommentaireDto, CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  Article,
  ArticleDocument,
  Commentaire,
  CommentaireDocument,
} from './entities/article.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from 'src/paginate.models';
import {
  Category,
  CategoryDocument,
} from 'src/categories/entities/category.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
    @InjectModel(Commentaire.name)
    private readonly commentModel: Model<CommentaireDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    // create new Article
    const newArticle = await new this.articleModel(createArticleDto);
    // set categories
    createArticleDto.categories.map(async (cat) =>
      newArticle.categories.push(await this.categoryModel.findById(cat)),
    );
    // set auteur
    const auteur = await this.userModel
      .findOne({ _id: createArticleDto?.auteur })
      .exec();

    console.log('auteur', auteur);
    newArticle.auteur = auteur?._id;
    console.log('auteur', newArticle.auteur);
    return newArticle.save();
  }

  async findByKeyWord(searchQuery: string, pagination: Pagination) {
    const option = {
      $or: [
        { title: new RegExp(searchQuery.toString(), 'i') },
        { content: new RegExp(searchQuery.toString(), 'i') },
      ],
    };
    const data = await this.articleModel
      .find(option)
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1));

    const total = await this.articleModel.count(option).exec();
    return {
      data,
      total,
      offset: pagination.offset,
      last_page: Math.ceil(total / pagination.limit),
    };
  }

  async comment(articleId: string, comm: CommentaireDto) {
    const commentaire = await new this.commentModel(comm).save();
    const article = await this.articleModel.findById(articleId);
    article.commentaires.push(commentaire);
    return await article.save();
  }

  async findAllUne(pagination: Pagination) {
    const options = { isAlaUne: { $in: ['true', true] } };
    const data = await this.articleModel
      .find(options)
      .populate('auteur')
      .populate('commentaires')
      .populate('categories')
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1));
    const total = await this.articleModel.count(options).exec();
    return {
      data,
      total,
      offset: pagination.offset,
      last_page: Math.ceil(total / pagination.limit),
    };
  }

  async findAllArchived(pagination: Pagination) {
    const options = { isArchived: { $in: ['true', true] } };
    const data = await this.articleModel
      .find(options)
      .populate('auteur')
      .populate('commentaires')
      .populate('categories')
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1))
      .exec();
    const total = await this.articleModel.count(options).exec();
    return {
      data,
      total,
      offset: pagination.offset,
      last_page: Math.ceil(total / pagination.limit),
    };
  }
  async findAllNonArchived(pagination: Pagination) {
    const options = { isArchived: { $in: ['false', false, undefined] } };
    const data = await this.articleModel
      .find(options)
      .populate('auteur')
      .populate('commentaires')
      .populate('categories')
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1))
      .exec();
    const total = await this.articleModel.count(options).exec();
    return {
      data,
      total,
      offset: pagination.offset,
      last_page: Math.ceil(total / pagination.limit),
    };
  }

  async findAll(pagination: Pagination) {
    const data = await this.articleModel
      .find()
      .limit(pagination.limit)
      .skip(pagination.page_size * (pagination.offset - 1))
      .populate('auteur')
      .populate('commentaires')
      .populate('categories')
      .exec();
    const total = await this.articleModel.count().populate('categories').exec();
    return {
      data,
      total,
      offset: pagination.offset,
      last_page: Math.ceil(total / pagination.limit),
    };
  }

  findOne(id: string) {
    return this.articleModel
      .findById(id)
      .populate('auteur')
      .populate('commentaires')
      .populate('categories');
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    console.log(updateArticleDto);
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto).exec();
  }

  remove(_id: string) {
    return this.articleModel.deleteOne({ _id }).exec();
  }
}

export function isBooleen(val: string | undefined): boolean | undefined {
  return val?.toLowerCase() === 'false' ? undefined : true;
}
