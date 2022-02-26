import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateCategoryDto {
  title: string;
  libelles: string;
  description: string;
  datePublication: Date;
  dateArchivage?: Date;
  isArchived: boolean;
  dateModification?: Date;
  author: CreateUserDto[];
  auteur?: string;
}
