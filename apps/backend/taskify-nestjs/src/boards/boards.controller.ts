import { Controller, Post, Get, Put, Delete, Param, HttpCode, HttpStatus, UseGuards, Body, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from '../common/dto/board.dto';

@Controller('boards')
export class BoardsController {

    constructor(private readonly boardService: BoardsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req) {
        return this.boardService.createBoard(createBoardDto, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('workspace/:workspaceId')
    @HttpCode(HttpStatus.OK)
    getBoardsByWorkspace(@Param('workspaceId') workspaceId: number) {
        return this.boardService.getBoardsByWorkspace(workspaceId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getBoard(@Param('id') id: number) {
        return this.boardService.getBoard(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateBoard(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
        return this.boardService.updateBoard(id, updateBoardDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteBoard(@Param('id') id: number) {
        return this.boardService.deleteBoard(id);
    }
}
