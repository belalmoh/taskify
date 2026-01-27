import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Checklist } from "./checklist.entity";

@Entity('checklist_items')
export class ChecklistItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: false })
    isCompleted: boolean;

    @Column({ type: 'int', default: 0 })
    position: number;

    // Relations
    @ManyToOne(() => Checklist, (checklist) => checklist.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'checklistId' })
    checklist: Checklist;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
