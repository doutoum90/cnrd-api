import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adherantService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adherantService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdherantDto: UpdateAdherantDto,
  ) {
    return this.adherantService.update(id, updateAdherantDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adherantService.remove(id);
  }
}
