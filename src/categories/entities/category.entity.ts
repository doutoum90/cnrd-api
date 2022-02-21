import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
}

export const CategorySchema = SchemaFactory.createForClass(Category);
