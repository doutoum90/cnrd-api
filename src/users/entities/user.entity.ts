import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  id: string;
  @Prop()
  nom: string;
  @Prop()
  prenom: string;

  @Prop()
  dateNaissance?: Date;
  @Prop()
  email?: string;
  @Prop()
  motDePasse?: string;
  @Prop()
  roles?: string[];
  @Prop()
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
}

export const UserSchema = SchemaFactory.createForClass(User);
