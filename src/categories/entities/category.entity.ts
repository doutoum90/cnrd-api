import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  title: string;
  @Prop()
  libelles: string;
  @Prop()
  description: string;
  @Prop()
  datePublication: Date;
  @Prop()
  dateArchivage?: Date;
  @Prop()
  isArchived: boolean;
  @Prop()
  dateModification?: Date;
  @Prop()
  idUser: string;
  @Prop(
    raw({
      nom: { type: String },
      prenom: { type: String },
      photo: { type: String },
    }),
  )
  auteur: Record<string, any>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
