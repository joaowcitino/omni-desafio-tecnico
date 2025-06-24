import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(signupDto: SignupDto): Promise<{ id: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: signupDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = this.usersRepository.create({
      username: signupDto.username,
      password: hashedPassword,
      birthdate: signupDto.birthdate,
      balance: 100,
    });

    const savedUser = await this.usersRepository.save(user);
    return { id: savedUser.id };
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'birthdate', 'balance'],
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async updateBalance(userId: string, newBalance: number): Promise<void> {
    const result = await this.usersRepository.update(
      { id: userId },
      { balance: newBalance },
    );

    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
}
