import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Pagination } from 'src/paginate.models';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('posts')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('search')
  async findByKeyWord(@Query('term') term: string, @Headers() headers: any) {
    const pagination: Pagination = JSON.parse(headers.pagination);
    return this.articlesService.findByKeyWord(term, pagination);
  }

  @Patch('comments/:id')
  async comment(@Param('id') id: string, @Body() comm: any) {
    return await this.articlesService.comment(id, comm);
  }

  @Get()
  async findAll(@Query('crit') crit: string, @Headers() headers: any) {
    const pagination: Pagination = JSON.parse(headers?.pagination);
    switch (crit) {
      case 'une': {
        return await this.articlesService.findAllUne(pagination);
      }
      case 'nonArchived': {
        return await this.articlesService.findAllNonArchived(pagination);
      }

      case 'archived': {
        return await this.articlesService.findAllArchived(pagination);
      }
      default: {
        return await this.articlesService.findAll(pagination);
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
