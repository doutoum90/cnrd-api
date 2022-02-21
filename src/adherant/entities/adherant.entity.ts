import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type AdherantDocument = Adherant & Document;

@Schema()
export class Adherant {
  @Prop()
  nom: string;
  @Prop()
  prenom: string;
  @Prop()
  dateNaissance: Date;
  @Prop()
  LieuNaissance: string;
  @Prop()
  nationalite: string;
  @Prop()
  profession: string;
  @Prop()
  adresse: string;
  @Prop()
  phone: string;
  @Prop()
  mail: string;
  @Prop()
  photo: string;
  @Prop(
    raw({
      libelle: { type: String },
      montant: { type: Number },
      devise: { type: String },
    }),
  )
  cotisation: Record<string, any>;
}
export const AdherantSchema = SchemaFactory.createForClass(Adherant);
