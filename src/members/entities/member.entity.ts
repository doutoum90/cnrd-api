import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MemberDocument = Member & Document;

@Schema()
export class Member {
  @Prop()
  nom: string;
  @Prop()
  prenom: string;
  @Prop()
  fonction: string;
  @Prop()
  metier: string;
  @Prop()
  photo?: string;
  @Prop()
  isPresident: boolean;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
