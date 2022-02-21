import { PartialType } from '@nestjs/swagger';
import { CreateAdherantDto } from './create-adherant.dto';

export class UpdateAdherantDto extends PartialType(CreateAdherantDto) {}
