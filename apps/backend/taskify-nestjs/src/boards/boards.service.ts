import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto, UpdateBoardDto } from '../common/dto/board.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class BoardsService {

    constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) { }

    async createBoard(createBoardDto: CreateBoardDto, user: User) {
        const board = this.boardRepository.create({
            ...createBoardDto,
            owner: { id: user.id },
            workspace: { id: createBoardDto.workspaceId }
        });
        return await this.boardRepository.save(board);
    }

    async getBoardsByWorkspace(workspaceId: number) {
        return await this.boardRepository.find({
            where: { workspace: { id: workspaceId } },
            order: { createdAt: 'DESC' }
        });
    }

    async getBoard(id: number) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['columns', 'columns.cards', 'workspace']
        });

        if (!board) {
            throw new NotFoundException(`Board with ID ${id} not found`);
        }

        return board;
    }

    async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
        const board = await this.getBoard(id);
        Object.assign(board, updateBoardDto);
        return await this.boardRepository.save(board);
    }

    async deleteBoard(id: number) {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Board with ID ${id} not found`);
        }
        return { success: true };
    }
}
