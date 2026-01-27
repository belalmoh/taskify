import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Card } from "./card.entity";
import { ChecklistItem } from "./checklist-item.entity";

@Entity('checklists')
export class Checklist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'int', default: 0 })
    position: number;

    // Relations
    @ManyToOne(() => Card, (card) => card.checklists, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cardId' })
    card: Card;

    @OneToMany(() => ChecklistItem, (item) => item.checklist, { cascade: true })
    items: ChecklistItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
