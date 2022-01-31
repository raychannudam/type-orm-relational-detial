import { Meeting } from './meeting.entity';
import { ContactInfo } from './contact-info.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from './task.entity';

@Entity()
export class Employee{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(()=>Employee, employee => employee.directReports, {onDelete: 'SET NULL', /*use eager: true - if you want that feild for every time u query, user cascade: true - if you want that feild without save many times*/})
    manager: Employee

    @OneToMany(()=>Employee, employee => employee.manager, {onDelete: "SET NULL"})
    directReports: Employee[]

    @OneToOne(()=>ContactInfo, contactInfo => contactInfo.employee)
    contactInfo: ContactInfo

    @OneToMany(()=>Task, task => task.employee)
    tasks: Task[];

    @ManyToMany(()=>Meeting, meeting => meeting.attendees)
    @JoinTable()
    meetings: Meeting[]

}