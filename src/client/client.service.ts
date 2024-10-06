import { Injectable } from '@nestjs/common'
import type { CreateClientDto } from './dto/create-client.dto'
import type { UpdateClientDto } from './dto/update-client.dto'
// import type { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ClientService {
  // constructor(private prismaService: PrismaService) {}
  // create(createClientDto: CreateClientDto) {
  //   return this.prismaService.client.create({
  //     data: {
  //       name: createClientDto.name,
  //       phone: createClientDto.phone,
  //     },
  //   })
  // }
  // findAll() {
  //   return this.prismaService.client.findMany()
  // }
  // findOne(id: string) {
  //   return this.prismaService.client.findUnique({
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
  // update(id: string, updateClientDto: UpdateClientDto) {
  //   return this.prismaService.client.update({
  //     data: {
  //       name: updateClientDto.name,
  //       phone: updateClientDto.phone,
  //     },
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
  // remove(id: string) {
  //   return this.prismaService.client.delete({
  //     where: {
  //       id: id,
  //     },
  //   })
  // }
}
