import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: User = {
    id: '1',
    username: 'testuser',
    password: 'hashedpassword',
    birthdate: '1990-01-01',
    balance: 100,
  };

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const signupDto = {
      username: 'newuser',
      password: 'password123',
      birthdate: '1990-01-01',
    };

    it('should create a new user successfully', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

      const result = await service.create(signupDto);

      expect(result).toEqual({ id: '1' });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'newuser' },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if user already exists', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      await expect(service.create(signupDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findByUsername', () => {
    it('should return user if found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
    });

    it('should return null if user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByUsername('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('testuser', 'password123');

      expect(result).toEqual(mockUser);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedpassword',
      );
    });

    it('should return null if password is invalid', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('testuser', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return null if user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent', 'password123');

      expect(result).toBeNull();
    });
  });

  describe('updateBalance', () => {
    it('should update user balance successfully', async () => {
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.updateBalance('1', 150);

      expect(mockRepository.update).toHaveBeenCalledWith(
        { id: '1' },
        { balance: 150 },
      );
    });

    it('should throw NotFoundException if user not found', async () => {
      mockRepository.update.mockResolvedValue({ affected: 0 });

      await expect(service.updateBalance('999', 150)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all users without password', async () => {
      const users = [
        {
          id: '1',
          username: 'user1',
          birthdate: '1990-01-01',
          balance: 100,
        },
        {
          id: '2',
          username: 'user2',
          birthdate: '1995-05-15',
          balance: 200,
        },
      ];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalledWith({
        select: ['id', 'username', 'birthdate', 'balance'],
      });
    });
  });
});
