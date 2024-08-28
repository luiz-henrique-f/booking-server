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

    const existBooking = await this.validHourBooking(
      createBookingDto.start_time,
      createBookingDto.id_user,
      createBookingDto.date,
    );

    if (existBooking) {
      throw new Error(
        'Atenção, já existe um agendamento para o mesmo dia e horário',
      );
    }

    const dayValid = await this.validDayUser(
      createBookingDto.date,
      createBookingDto.id_user,
    );

    if (dayValid) {
      throw new Error('Atenção, o colaborador está fora de serviço nesse dia');
    }

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

  async validHourBooking(start_time: string, id_user: string, date: Date) {
    const result = await this.prismaService.$queryRaw`SELECT booking.id
                                                      FROM   booking
                                                      WHERE  ${start_time}::time >=  booking.start_time::time
                                                      and    ${start_time}::time <=  booking.end_time::time
                                                      and    TO_CHAR(booking.date::timestamp, 'DD/MM/YYYY') = TO_CHAR(${date}::timestamp, 'DD/MM/YYYY')
                                                      AND    booking.id_user = ${id_user};`;

    return result[0];
  }

  async validDayUser(date: Date, id_user: string) {
    const result = await this.prismaService.$queryRaw`SELECT "establishment".*
                                                      FROM   "establishment"
                                                           , "user"
                                                      WHERE  case when TO_CHAR(${date}::timestamp, 'd') < "establishment".start_day_service then 1
                                                                  when TO_CHAR(${date}::timestamp, 'd') > "establishment".end_day_service  then 1
                                                             end = 1
                                                      and    "establishment".id = "user".id_establishment
                                                      and    "user".id          = ${id_user};`;

    return result[0];
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
