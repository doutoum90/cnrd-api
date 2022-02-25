import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
  categories: CreateCategoryDto[];
  commentaires?: CommentaireDto[];
  auteur: CreateUserDto;
}

export interface CommentaireDto {
  content: string;
  datePublication: Date;
  article: CreateArticleDto;
  nom: string;
  mail: string;
}
