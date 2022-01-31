import { Task } from './task.entity';
import { Meeting } from './meeting.entity';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  async seed() {
    //create 1 employee - ceo
    const ceo = this.employeeRepo.create({name: 'Mr. CEO'})
    await this.employeeRepo.save(ceo) //ceo id automatically create
    //given contact info tp ceo
    const ceoContactInfo = this.contactInfoRepo.create({email: 'email@email.com', phone: '012345678'})
    ceoContactInfo.employee = ceo //to make relationship
    await this.contactInfoRepo.save(ceoContactInfo)
      //or one more way to make relationship
      //const ceoContactInfo = this.contactInfoRepo.create({email: 'email@email.com', phone: '012345678', employee: ceo.id})

    //create 1 more employee - manager
    const manager = this.employeeRepo.create({
      name: 'Marius',
      manager: ceo, // set manager of manager
    })
    //create task
    const task1 = this.taskRepo.create({name: 'Hire people'})
    await this.taskRepo.save(task1)
    const task2 = this.taskRepo.create({name: 'Present to CEO'})
    await this.taskRepo.save(task2)
    //set task for manager
    manager.tasks = [task1, task2]
    await this.employeeRepo.save(manager)

    //create meeting
    const meeting1 = this.meetingRepo.create({zoomUrl: 'meeting.com'})
    //set meeting participaint 
    meeting1.attendees = [ceo]
    await this.meetingRepo.save(meeting1)
    //set manager to join the meeting1 too
    manager.meetings = [meeting1]
    await this.employeeRepo.save(manager)

  }

  getEmployeeById(id: number): Promise<Employee>{
    return this.employeeRepo.findOne(id, {
      relations: ['manager', 'directReports', 'tasks', 'contactInfo', 'meetings']
    })
  }

  deleteEmployee(id: number) {
    return this.employeeRepo.delete(id)
  }

  getHello(): string {
    return 'Hello World!';
  }
}
