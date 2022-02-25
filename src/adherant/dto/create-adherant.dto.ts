export class CreateAdherantDto {
  nom: string;
  prenom: string;
  dateNaissance: Date;
  LieuNaissance: string;
  nationalite: string;

  profession: string;
  adresse: string;
  phone: string;
  mail: string;
  photo: string;

  cotisation: Cotisation;
}

export interface Cotisation {
  libelle: string;
  montant: number;
  devise: string;
}
