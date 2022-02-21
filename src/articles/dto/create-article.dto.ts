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
}
export interface Commentaire {
  _id: string;
  content: string;
  datePublication: Date;
  dateModification?: Date;
  auteur: string;
}
