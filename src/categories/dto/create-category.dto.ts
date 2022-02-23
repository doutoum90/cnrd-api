export class CreateCategoryDto {
  title: string;
  libelles: string;
  description: string;
  datePublication: Date;
  dateArchivage?: Date;
  isArchived: boolean;
  dateModification?: Date;
  idUser: string;
  auteur: Auteur;
}

export interface Auteur {
  nom: string;
  prenom: string;
  photo: string;
}
