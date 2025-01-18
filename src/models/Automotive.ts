import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
export class Automotive {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;
}
