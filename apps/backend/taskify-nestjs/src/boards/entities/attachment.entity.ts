import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Card } from "./card.entity";
import { User } from "../../auth/entities/user.entity";

@Entity('attachments')
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column()
    url: string;

    @Column({ nullable: true })
    mimeType: string;

    @Column({ type: 'bigint', nullable: true })
    size: number;

    @Column({ default: false })
    isCover: boolean;

    @Column()
    cardId: number;

    // Relations
    @ManyToOne(() => Card, (card) => card.attachments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cardId' })
    card: Card;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'uploadedBy' })
    uploader: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
