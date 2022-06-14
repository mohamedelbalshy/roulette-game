import { BadRequestException, Injectable } from '@nestjs/common';
import { BetDto } from './dtos/spin.dto';

@Injectable()
export class RouletteService {
  isBalanceEnough(bets: BetDto[], session: Record<string, any>) {
    let betsAmount = 0;

    for (const bet of bets) {
      betsAmount += bet.betAmount;
    }

    if (betsAmount > session.balance)
      throw new BadRequestException(
        `Bets amount can not be greater than your balance!`,
      );
  }

  randomWinningNumber(): number {
    return Math.floor(Math.random() * 36) + 0;
  }

  getWinningBets(bets: BetDto[], winningNumber: number) {
    const winningBets: BetDto[] = [];
    for (const bet of bets) {
      if (bet.betType === winningNumber) {
        winningBets.push(bet);
        continue;
      }
      if (bet.betType === 'even' && winningNumber % 2 === 0) {
        winningBets.push(bet);
        continue;
      }

      if (bet.betType === 'odd' && winningNumber % 2 === 1) {
        winningBets.push(bet);
        continue;
      }
    }
    return winningBets;
  }

  spin(bets: BetDto[], session: Record<string, any>) {
    this.isBalanceEnough(bets, session.balance);

    const winningNumber = this.randomWinningNumber();

    const winningBets = this.getWinningBets(bets, winningNumber);
    let winningAmount = 0;
    winningBets.forEach((bet) => (winningAmount += bet.betAmount));

    session.balance += winningAmount;

    return { winningBets, balance: session.balance };
  }
}
