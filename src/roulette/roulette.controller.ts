import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SpinDto } from './dtos/spin.dto';
import { RouletteService } from './roulette.service';

@Controller('roulette')
export class RouletteController {
  constructor(private readonly rouletteService: RouletteService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Request() req, @Session() session) {
    // read balance from jwt and set the session with user stating balance

    session.balance = req.user.balance ? req.user.balance : 0;

    return { ...req.user, balance: session.balance };
  }

  @UseGuards(JwtAuthGuard)
  @Post('spin')
  spin(@Session() session, @Body() spinDto: SpinDto) {
    if (!session.balance) {
      throw new BadRequestException(`You need to add balance first `);
    }
    return this.rouletteService.spin(spinDto.bets, session);
  }

  @UseGuards(JwtAuthGuard)
  @Post('end')
  end(@Session() session) {
    session.destroy();
  }
}
