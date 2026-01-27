import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import {
  Workspace,
  Board,
  BoardColumn,
  Card,
  Label,
  Checklist,
  ChecklistItem,
  Comment,
  Attachment
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workspace,
      Board,
      BoardColumn,
      Card,
      Label,
      Checklist,
      ChecklistItem,
      Comment,
      Attachment
    ])
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [TypeOrmModule]
})
export class BoardsModule { }
