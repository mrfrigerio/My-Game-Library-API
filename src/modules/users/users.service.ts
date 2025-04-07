import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async listAll(): Promise<Omit<User, 'password_hash'>[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findById(id: number): Promise<Omit<User, 'password_hash'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<Omit<User, 'password_hash'>> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async create(userData: CreateUserDto): Promise<Omit<User, 'password_hash'>> {
    const { name, email, password, address } = userData;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const adress = await this.prisma.address.create({
      data: address,
    });
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash: await bcrypt.hash(password, 8),
        addresses: {
          connect: {
            id: adress.id,
          },
        },
      },
      include: {
        addresses: true,
      },
      omit: {
        password_hash: true,
      },
    });
    return user;
  }

  async checkUserPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }
}
