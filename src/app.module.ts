import { Task } from './task.entity';
import { Meeting } from './meeting.entity';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
