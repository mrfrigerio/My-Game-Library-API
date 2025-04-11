import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { AddGameToLibraryDto } from './dto/add-game-to-library.dto';

@ApiTags('Biblioteca')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar jogos da biblioteca' })
  async listAll(@Query('page') page: number = 1) {
    return this.libraryService.listAll(page);
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar jogo na biblioteca' })
  async insert(@Body() body: AddGameToLibraryDto) {
    return this.libraryService.insertGame(body.gameId);
  }

  @Delete()
  @ApiOperation({ summary: 'Remover jogos da biblioteca' })
  async remove(@Query('page') page: number = 1) {
    return this.libraryService.listAll(page);
  }
}
