export class CreateArticleDto {
  title: string;
  isArchived: boolean;
  isAlaUne: boolean;
  content: string;
  shortContent: string;
  datePublication: Date;
  dateModification?: Date;
  dateArchivage?: Date;
  dateAlaUne?: Date;
  icon: string;
  documents?: any[];
  cats: string[];
  commentaires?: Commentaire[];
  auteur: Auteur;
}

export interface Auteur {
  nom: string;
  prenom: string;
  photo: string;
}
export interface Commentaire {
  _id: string;
  content: string;
  datePublication: Date;
  dateModification?: Date;
  auteur: string;
}
