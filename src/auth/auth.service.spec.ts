import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: '1',
    username: 'testuser',
    password: 'hashedpassword',
    birthdate: '1990-01-01',
    balance: 100,
  };

  const mockUsersService = {
    validateUser: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const signinDto = {
      username: 'testuser',
      password: 'password123',
    };

    it('should return token and expiresIn when credentials are valid', async () => {
      mockUsersService.validateUser.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.signIn(signinDto);

      expect(result).toEqual({
        token: 'jwt-token',
        expiresIn: '1h',
      });
      expect(mockUsersService.validateUser).toHaveBeenCalledWith(
        'testuser',
        'password123',
      );
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'testuser',
        sub: '1',
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      mockUsersService.validateUser.mockResolvedValue(null);

      await expect(service.signIn(signinDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.validateUser).toHaveBeenCalledWith(
        'testuser',
        'password123',
      );
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });
});
