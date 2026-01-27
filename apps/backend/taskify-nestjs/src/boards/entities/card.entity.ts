import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { BoardColumn } from "./column.entity";
import { User } from "../../auth/entities/user.entity";
import { Label } from "./label.entity";
import { Checklist } from "./checklist.entity";
import { Comment } from "./comment.entity";
import { Attachment } from "./attachment.entity";

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'int', default: 0 })
    position: number;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ type: 'timestamp', nullable: true })
    dueDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    startDate: Date;

    @Column({ default: false })
    isCompleted: boolean;

    // Relations
    @ManyToOne(() => BoardColumn, (column) => column.cards, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'columnId' })
    column: BoardColumn;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'card_members',
        joinColumn: { name: 'cardId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' }
    })
    members: User[];

    @ManyToMany(() => Label, (label) => label.cards)
    @JoinTable({
        name: 'card_labels',
        joinColumn: { name: 'cardId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'labelId', referencedColumnName: 'id' }
    })
    labels: Label[];

    @OneToMany(() => Checklist, (checklist) => checklist.card, { cascade: true })
    checklists: Checklist[];

    @OneToMany(() => Comment, (comment) => comment.card, { cascade: true })
    comments: Comment[];

    @OneToMany(() => Attachment, (attachment) => attachment.card, { cascade: true })
    attachments: Attachment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}