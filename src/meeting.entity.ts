import { Employee } from './employee.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting{
     @PrimaryGeneratedColumn()
     id: string

     @Column()
     zoomUrl: string

     @ManyToMany(()=>Employee, employee => employee.meetings)
     attendees: Employee[]
}