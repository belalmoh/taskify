import { Module } from '@nestjs/common';
import { BoardServiceController } from './board-service.controller';
import { BoardServiceService } from './board-service.service';

@Module({
  imports: [],
  controllers: [BoardServiceController],
  providers: [BoardServiceService],
})
export class BoardServiceModule {}
