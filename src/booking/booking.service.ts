import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const service = await this.prismaService.service.findUnique({
      where: {
        id: createBookingDto.id_service,
      },
    });

    const endTime = await this.getEndTime(
      createBookingDto.start_time,
      service.duration,
    );

    return this.prismaService.booking.create({
      data: {
        id_user: createBookingDto.id_user,
        id_client: createBookingDto.id_client,
        id_service: createBookingDto.id_service,
        date: createBookingDto.date,
        start_time: createBookingDto.start_time,
        end_time: endTime,
        observation: createBookingDto.observation,
      },
    });
  }

  async getEndTime(start_time: string, interval: string) {
    const intervalService = Number(interval);
    const result = await this.prismaService
      .$queryRaw`SELECT TO_CHAR(TO_TIMESTAMP(${start_time}, 'HH24:MI') + (${intervalService} * '1 minute'::interval), 'HH24:MI') AS new_time;
`;
    return result[0].new_time;
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

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const service = await this.prismaService.service.findUnique({
      where: {
        id: updateBookingDto.id_service,
      },
    });

    const endTime = await this.getEndTime(
      updateBookingDto.start_time,
      service.duration,
    );

    return this.prismaService.booking.update({
      data: {
        date: updateBookingDto.date,
        start_time: updateBookingDto.start_time,
        end_time: endTime,
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
