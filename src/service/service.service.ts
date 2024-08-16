import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prismaService: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    return this.prismaService.service.create({
      data: {
        id_user: createServiceDto.id_user,
        description: createServiceDto.description,
        price: createServiceDto.price,
        duration: createServiceDto.duration,
      },
    });
  }

  findAll() {
    return this.prismaService.service.findMany();
  }

  findOne(id: string) {
    return this.prismaService.service.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.prismaService.service.update({
      data: {
        description: updateServiceDto.description,
        duration: updateServiceDto.duration,
        price: updateServiceDto.price,
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.service.delete({
      where: {
        id: id,
      },
    });
  }
}
