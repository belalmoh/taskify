import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Card } from "./card.entity";
import { User } from "../../auth/entities/user.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    content: string;

    // Relations
    @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cardId' })
    card: Card;

    @ManyToOne(() => User, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'userId' })
    author: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
