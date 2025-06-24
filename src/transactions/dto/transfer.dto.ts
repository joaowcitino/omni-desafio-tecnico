import { IsString, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
  @IsString()
  fromId: string;

  @IsString()
  toId: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
