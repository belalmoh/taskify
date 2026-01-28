import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import {
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
		WorkspacesModule, // Import to access Workspace repository
		TypeOrmModule.forFeature([
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
	controllers: [BoardsController]
})
export class BoardsModule { }
