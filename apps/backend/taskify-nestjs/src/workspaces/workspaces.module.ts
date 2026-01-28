import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [TypeOrmModule.forFeature([Workspace]), AuthModule],
	controllers: [WorkspacesController],
	providers: [WorkspacesService],
	exports: [TypeOrmModule], // Export so other modules can use Workspace repository
})
export class WorkspacesModule { }
