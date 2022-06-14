import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Session() session: Record<string, any>): string {
    session.visits = session.visits ? session.visits + 1 : 1;
    console.log(session.visits);
    return this.appService.getHello();
  }
}
