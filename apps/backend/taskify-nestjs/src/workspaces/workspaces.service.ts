import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreateWorkspaceDto } from 'src/common/dto/workspace.dto';

@Injectable()
export class WorkspacesService {

    constructor(@InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>) { }

    async create(createWorkspaceDto: CreateWorkspaceDto, user: User) {
        const workspace = this.workspaceRepository.create(createWorkspaceDto);
        workspace.owner = user;
        return this.workspaceRepository.save(workspace);
    }

    async findAll(user: User) {
        return this.workspaceRepository.find({ where: { owner: user } });
    }
}
