import { Injectable } from '@nestjs/common';
import { getGames } from 'src/modules/games/services/rawg-api.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class LibraryService {
  async listAll(page: number):  Promise<AxiosResponse<any, any>> {
    return getGames(page);
  }

  async insertGame(gameId: string):  Promise<AxiosResponse<any, any>> {
    return getGames(1);
  }
}
