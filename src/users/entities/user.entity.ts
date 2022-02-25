import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Article } from 'src/articles/entities/article.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  nom: string;
  @Prop()
  prenom: string;
  @Prop()
  dateNaissance?: Date;
  @Prop({ unique: true })
  email?: string;
  @Prop()
  motDePasse?: string;
  @Prop()
  roles?: string;
  @Prop({ unique: true })
  userName?: string;
  @Prop()
  phone?: string;
  @Prop()
  isActive?: boolean;
  @Prop()
  genre?: string;
  @Prop()
  dateCreation?: Date;
  @Prop()
  photo?: string;
  @Prop()
  dateModification?: Date;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  })
  article: Article;
}

export const UserSchema = SchemaFactory.createForClass(User);
