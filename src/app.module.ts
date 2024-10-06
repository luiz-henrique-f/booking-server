import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { EstablishmentModule } from './establishment/establishment.module'
// import { EstablishmentModule } from './establishment/establishment.module';
import { UsersModule } from './users/users.module'
import { BookingModule } from './booking/booking.module'
import { ServiceModule } from './service/service.module'
import { ClientModule } from './client/client.module'

@Module({
  imports: [
    PrismaModule,
    EstablishmentModule,
    UsersModule,
    BookingModule,
    ServiceModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
