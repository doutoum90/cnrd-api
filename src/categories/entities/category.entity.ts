import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  auteur: CreateUserDto;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
