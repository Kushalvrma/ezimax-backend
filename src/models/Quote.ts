import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Service } from "./Service";
import { Automotive } from "./Automotive";
import "reflect-metadata";

@Entity()
export class Quote {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    email?: string;

    @Column()
    address?: string;

    @Column()
    city?: string;

    @Column()
    state?: string;

    @Column()
    phone?: string;

    @ManyToOne(() => Service, { nullable: false })
    service?: Service;

    @ManyToOne(() => Automotive, { nullable: false })
    automotive?: Automotive;

    @Column()
    vehicleYear?: string;

    @Column()
    vehicleMake?: string;

    @Column()
    vehicleModel?: string;

    @Column()
    note?: string;

    @Column()
    imagePath?: string; // Path to the uploaded image
}
