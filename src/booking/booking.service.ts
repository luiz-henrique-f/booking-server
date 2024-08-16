import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  create(createBookingDto: CreateBookingDto) {
    return this.prismaService.booking.create({
      data: {
        id_user: createBookingDto.id_user,
        id_client: createBookingDto.id_client,
        id_service: createBookingDto.id_service,
        date: createBookingDto.date,
        start_time: createBookingDto.start_time,
        end_time: createBookingDto.end_time,
        observation: createBookingDto.observation,
      },
    });
  }

  findAll() {
    return this.prismaService.booking.findMany();
  }

  findUser(id_user: string) {
    return this.prismaService.booking.findMany({
      where: {
        id_user: id_user,
      },
    });
  }

  findClient(id_client: string) {
    return this.prismaService.booking.findMany({
      where: {
        id_client: id_client,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.booking.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.prismaService.booking.update({
      data: {
        date: updateBookingDto.date,
        start_time: updateBookingDto.start_time,
        // end_time: Criar lógica para calcular automático a hora final
      },
      where: {
        id: id,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.booking.delete({
      where: {
        id: id,
      },
    });
  }
}
