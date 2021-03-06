import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ unique: true })
  title: string;
  @Prop({ unique: true })
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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  author: User[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
