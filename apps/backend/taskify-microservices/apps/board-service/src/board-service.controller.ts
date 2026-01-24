import { Controller, Get } from '@nestjs/common';
import { BoardServiceService } from './board-service.service';

@Controller()
export class BoardServiceController {
  constructor(private readonly boardServiceService: BoardServiceService) {}

  @Get()
  getHello(): string {
    return this.boardServiceService.getHello();
  }
}
