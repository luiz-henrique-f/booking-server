import { Injectable } from '@nestjs/common'
import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'
import type { PrismaService } from 'src/prisma/prisma.service'
import type { LoginUserDto } from './dto/login-user.dto'
import * as bcrypt from 'bcrypt'
import type { GetSchedulesUser } from './dto/get-schedules-user.dto'

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
    })
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    })
  }

  async findSchedules(GetSchedulesUser: GetSchedulesUser) {
    const user = await this.findOne(GetSchedulesUser.id)

    const result = await this.prismaService.$queryRaw`WITH RECURSIVE horarios AS (
                -- CTE inicial com o horário de início
                SELECT ${user.start_time_service}::time AS start_time
                UNION ALL
                -- Adiciona 30 minutos ao horário de início até chegar ao limite
                SELECT start_time + '30 minutes'::interval
                FROM horarios
                WHERE start_time < ${user.end_time_service}::time - '30 minutes'::interval
            )
            -- Seleciona as faixas de horário
            SELECT TO_CHAR(tmp.start_hour, 'HH24:MI') start_hour,
                   TO_CHAR(tmp.end_hour, 'HH24:MI') end_hour
            FROM (
                SELECT start_time AS start_hour,
                      start_time + '30 minutes'::interval AS end_hour
                FROM   horarios
            ) AS tmp
            WHERE NOT EXISTS (
                SELECT 1
                FROM   booking
                WHERE  CASE WHEN tmp.start_hour = booking.start_time::time THEN 1
                            WHEN tmp.start_hour >= booking.start_time::time AND tmp.start_hour <= booking.end_time::time THEN 1
                      END = 1
                AND   TO_CHAR(booking.date::timestamp, 'DD/MM/YYYY') = TO_CHAR(${GetSchedulesUser.date}::timestamp, 'DD/MM/YYYY')
                AND   booking.id_user = ${GetSchedulesUser.id}
            )
            ORDER BY 1 ASC;`
    return result
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
    })
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    })
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.findByEmail(LoginUserDto.email)

    const isPassword = await bcrypt.compare(
      LoginUserDto.password,
      user.password
    )

    if (!user || !isPassword) {
      throw new Error('Email ou senha inválidos.')
    }

    return user
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10)
  }
}
