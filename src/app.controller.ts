import { Employee } from './employee.entity';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async seed() {
    return this.appService.deleteEmployee(1);
  }
}
