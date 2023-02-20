import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/createUser.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const { name, email, password } = createUserInput;
    const hashedPassword = await hash(password, 10);

    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  async getUser(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
