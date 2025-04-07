import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    const { id } = params;
    return `This action returns a #${id} item`;
  }
}
