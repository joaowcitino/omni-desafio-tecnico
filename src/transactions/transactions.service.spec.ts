import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UsersService } from '../users/users.service';
import { Transaction } from './entities/transaction.entity';

describe('TransactionsService', () => {
  let service: TransactionsService;

  const mockUser1 = {
    id: '1',
    username: 'user1',
    password: 'hashedpassword',
    birthdate: '1990-01-01',
    balance: 100,
  };

  const mockUser2 = {
    id: '2',
    username: 'user2',
    password: 'hashedpassword',
    birthdate: '1995-05-15',
    balance: 200,
  };

  const mockUsersService = {
    findById: jest.fn(),
    updateBalance: jest.fn(),
  };

  const mockTransactionRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('transfer', () => {
    const transferDto = {
      fromId: '1',
      toId: '2',
      amount: 50,
    };

    it('should transfer money successfully', async () => {
      mockUsersService.findById
        .mockResolvedValueOnce(mockUser1)
        .mockResolvedValueOnce(mockUser2);
      mockUsersService.updateBalance.mockResolvedValue(undefined);
      mockTransactionRepository.create.mockReturnValue({});
      mockTransactionRepository.save.mockResolvedValue({});

      await service.transfer(transferDto);

      expect(mockUsersService.findById).toHaveBeenCalledWith('1');
      expect(mockUsersService.findById).toHaveBeenCalledWith('2');
      expect(mockUsersService.updateBalance).toHaveBeenCalledWith('1', 50);
      expect(mockUsersService.updateBalance).toHaveBeenCalledWith('2', 250);
      expect(mockTransactionRepository.create).toHaveBeenCalled();
      expect(mockTransactionRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException when trying to transfer to self', async () => {
      const selfTransferDto = {
        fromId: '1',
        toId: '1',
        amount: 50,
      };

      await expect(service.transfer(selfTransferDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when amount is negative', async () => {
      const negativeTransferDto = {
        fromId: '1',
        toId: '2',
        amount: -50,
      };

      await expect(service.transfer(negativeTransferDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when sender does not exist', async () => {
      mockUsersService.findById
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockUser2);

      await expect(service.transfer(transferDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when receiver does not exist', async () => {
      mockUsersService.findById
        .mockResolvedValueOnce(mockUser1)
        .mockResolvedValueOnce(null);

      await expect(service.transfer(transferDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when insufficient balance', async () => {
      const insufficientTransferDto = {
        fromId: '1',
        toId: '2',
        amount: 150,
      };

      mockUsersService.findById
        .mockResolvedValueOnce(mockUser1)
        .mockResolvedValueOnce(mockUser2);

      await expect(service.transfer(insufficientTransferDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
