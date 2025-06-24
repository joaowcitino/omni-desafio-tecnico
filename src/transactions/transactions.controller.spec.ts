import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const mockTransactionsService = {
    transfer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: mockTransactionsService,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('transfer', () => {
    it('should transfer money between users', async () => {
      const transferDto = {
        fromId: '1',
        toId: '2',
        amount: 50,
      };

      mockTransactionsService.transfer.mockResolvedValue(undefined);

      const result = await controller.transfer(transferDto);

      expect(result).toBeUndefined();
      expect(mockTransactionsService.transfer).toHaveBeenCalledWith(
        transferDto,
      );
    });
  });
});
