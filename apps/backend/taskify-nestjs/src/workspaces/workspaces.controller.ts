import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWorkspaceDto } from '../common/dto/workspace.dto';

@Controller('workspaces')
export class WorkspacesController {

    constructor(private readonly workspacesService: WorkspacesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req) {
        return this.workspacesService.create(createWorkspaceDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req) {
        return this.workspacesService.findAll(req.user);
    }
}
