import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouletteController } from './roulette/roulette.controller';
import { RouletteService } from './roulette/roulette.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, RouletteController],
  providers: [AppService, RouletteService],
})
export class AppModule {}
