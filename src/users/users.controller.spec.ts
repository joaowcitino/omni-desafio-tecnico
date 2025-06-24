import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const signupDto = {
        username: 'testuser',
        password: 'password123',
        birthdate: '1990-01-01',
      };
      const expectedResult = { id: '1' };

      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await controller.signup(signupDto);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.create).toHaveBeenCalledWith(signupDto);
    });
  });

  describe('signin', () => {
    it('should authenticate user and return token', async () => {
      const signinDto = {
        username: 'testuser',
        password: 'password123',
      };
      const expectedResult = {
        token: 'jwt-token',
        expiresIn: '1h',
      };

      mockAuthService.signIn.mockResolvedValue(expectedResult);

      const result = await controller.signin(signinDto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(signinDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [
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

      mockUsersService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.findAll();

      expect(result).toEqual(expectedUsers);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });
});
