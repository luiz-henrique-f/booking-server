import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        start_time_service: createUserDto.start_time_service,
        end_time_service: createUserDto.end_time_service,
        name: createUserDto.name,
        password: this.generateHash(createUserDto.password),
        phone: createUserDto.phone,
        id_establishment: createUserDto.id_establishment,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      data: {
        start_time_service: updateUserDto.start_time_service,
        end_time_service: updateUserDto.end_time_service,
        phone: updateUserDto.phone,
        id_establishment: updateUserDto.id_establishment,
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.findByEmail(LoginUserDto.email);

    const isPassword = await bcrypt.compare(
      LoginUserDto.password,
      user.password,
    );

    if (!user || !isPassword) {
      throw new Error('Email ou senha inválidos.');
    }

    return user;
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
