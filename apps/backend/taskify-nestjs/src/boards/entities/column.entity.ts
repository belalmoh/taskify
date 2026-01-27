import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Board } from "./board.entity";
import { Card } from "./card.entity";

@Entity('columns')
export class BoardColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'int', default: 0 })
    position: number;

    // Relations
    @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'boardId' })
    board: Board;

    @OneToMany(() => Card, (card) => card.column, { cascade: true })
    cards: Card[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}