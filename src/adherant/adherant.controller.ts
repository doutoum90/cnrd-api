import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdherantService } from './adherant.service';
import { CreateAdherantDto } from './dto/create-adherant.dto';
import { UpdateAdherantDto } from './dto/update-adherant.dto';

@Controller('adherant')
export class AdherantController {
  constructor(private readonly adherantService: AdherantService) {}

  @Post()
  create(@Body() createAdherantDto: CreateAdherantDto) {
    return this.adherantService.create(createAdherantDto);
  }

  @Get()
  findAll() {
    return this.adherantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adherantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdherantDto: UpdateAdherantDto,
  ) {
    return this.adherantService.update(id, updateAdherantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adherantService.remove(id);
  }
}
