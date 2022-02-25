import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CommentaireDto, CreateArticleDto } from '../dto/create-article.dto';

export type ArticleDocument = Article & Document;
export type CommentaireDocument = Commentaire & Document;

@Schema()
export class Article {
  @Prop()
  title: string;
  @Prop()
  isArchived: boolean;
  @Prop()
  isAlaUne: boolean;
  @Prop()
  content: string;
  @Prop()
  shortContent: string;
  @Prop()
  datePublication: Date;
  @Prop()
  dateModification?: Date;
  @Prop()
  dateArchivage?: Date;
  @Prop()
  dateAlaUne?: Date;
  @Prop()
  icon: string;
  @Prop()
  documents?: any[];
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  categories: CreateCategoryDto[];

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  auteur: CreateUserDto;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commentaire' }],
  })
  commentaires?: CommentaireDto[];
}
@Schema()
export class Commentaire {
  @Prop()
  content: string;
  @Prop()
  datePublication: Date;
  @Prop()
  nom: string;
  @Prop()
  mail: string;
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  })
  article: CreateArticleDto;
}

export const CommentaireSchema = SchemaFactory.createForClass(Commentaire);
export const ArticleSchema = SchemaFactory.createForClass(Article).index({
  title: 'text',
  content: 'text',
});
