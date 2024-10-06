import { Injectable } from '@nestjs/common'
import type { CreateEstablishmentDto } from './dto/create-establishment.dto'
import type { UpdateEstablishmentDto } from './dto/update-establishment.dto'
// import type { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class EstablishmentService {
  // constructor(private prismaService: PrismaService) {}
  // create(createEstablishmentDto: CreateEstablishmentDto) {
  //   return this.prismaService.establishment.create({
  //     data: {
  //       name: createEstablishmentDto.name,
  //       address: createEstablishmentDto.address,
  //       address_number: createEstablishmentDto.address_number,
  //       city: createEstablishmentDto.city,
  //       uf: createEstablishmentDto.uf,
  //       start_day_service: createEstablishmentDto.start_day_service,
  //       end_day_service: createEstablishmentDto.end_day_service,
  //       neighborhood: createEstablishmentDto.neighborhood,
  //       phone: createEstablishmentDto.phone,
  //     },
  //   })
  // }
  // findAll() {
  //   return this.prismaService.establishment.findMany()
  // }
  // findOne(id: string) {
  //   return this.prismaService.establishment.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
  // update(id: string, updateEstablishmentDto: UpdateEstablishmentDto) {
  //   return this.prismaService.establishment.update({
  //     data: {
  //       name: updateEstablishmentDto.name,
  //       address: updateEstablishmentDto.address,
  //       address_number: updateEstablishmentDto.address_number,
  //       city: updateEstablishmentDto.city,
  //       end_day_service: updateEstablishmentDto.end_day_service,
  //       neighborhood: updateEstablishmentDto.neighborhood,
  //       phone: updateEstablishmentDto.phone,
  //       start_day_service: updateEstablishmentDto.start_day_service,
  //       uf: updateEstablishmentDto.uf,
  //     },
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
  // remove(id: string) {
  //   return this.prismaService.establishment.delete({
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
}
