import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

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
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  })
  categories: Category[];

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  auteur: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commentaire' }],
  })
  commentaires?: Commentaire[];
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
  article: Article;
}

export const CommentaireSchema = SchemaFactory.createForClass(Commentaire);
export const ArticleSchema = SchemaFactory.createForClass(Article).index({
  title: 'text',
  content: 'text',
});
