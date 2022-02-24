import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

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
  @Prop([String])
  cats: string[];
  @Prop(
    raw({
      nom: { type: String },
      prenom: { type: String },
      photo: { type: String },
    }),
  )
  auteur: Record<string, any>;
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
  dateModification?: Date;
  @Prop()
  auteur: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article).index({
  title: 'text',
  content: 'text',
});
