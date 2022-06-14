import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export type BetType = number | 'even' | 'odd';

export class SpinDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BetDto)
  @ArrayMinSize(1)
  bets: BetDto[];
}

export class BetDto {
  @IsNotEmpty()
  @IsNumber()
  betAmount: number;

  @IsNotEmpty()
  betType: BetType;
}
