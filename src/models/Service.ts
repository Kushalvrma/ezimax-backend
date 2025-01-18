
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;
}
