export class CreateUserDto {
  nom?: string;
  prenom?: string;
  dateNaissance?: Date;
  email?: string;
  motDePasse?: string;
  roles?: string;
  userName?: string;
  phone?: string;
  isActive?: boolean;
  genre?: string;
  dateCreation?: Date;
  photo?: string;
  dateModification?: Date;
}
