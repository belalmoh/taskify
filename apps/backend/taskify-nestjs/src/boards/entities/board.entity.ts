import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../../auth/entities/user.entity";
import { BoardColumn } from "./column.entity";
import { Workspace } from "../../workspaces/entities/workspace.entity";

@Entity('boards')
export class Board {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'json', nullable: true })
    background: {
        type: 'image' | 'gradient';
        value: string;
    };

    @Column({ default: false })
    isFavorite: boolean;

    @Column({ type: 'enum', enum: ['private', 'workspace', 'public'], default: 'public' })
    visibility: string;

    // Relations
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    owner: User;

    @ManyToOne(() => Workspace, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'workspaceId' })
    workspace: Workspace;

    @OneToMany(() => BoardColumn, (column) => column.board, { cascade: true })
    columns: BoardColumn[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}