import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TransferDto } from './dto/transfer.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async transfer(transferDto: TransferDto): Promise<void> {
    const { fromId, toId, amount } = transferDto;

    if (fromId === toId) {
      throw new BadRequestException('Não é possível transferir para si mesmo');
    }

    if (amount <= 0) {
      throw new BadRequestException(
        'O valor da transferência deve ser positivo',
      );
    }

    const fromUser = await this.usersService.findById(fromId);
    const toUser = await this.usersService.findById(toId);

    if (!fromUser) {
      throw new NotFoundException('Usuário remetente não encontrado');
    }

    if (!toUser) {
      throw new NotFoundException('Usuário destinatário não encontrado');
    }

    if (fromUser.balance < amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const newFromBalance = Number(fromUser.balance) - amount;
    const newToBalance = Number(toUser.balance) + amount;

    await Promise.all([
      this.usersService.updateBalance(fromId, newFromBalance),
      this.usersService.updateBalance(toId, newToBalance),
    ]);

    const transaction = this.transactionRepository.create({
      fromUser,
      toUser,
      amount,
    });

    await this.transactionRepository.save(transaction);
  }
}
