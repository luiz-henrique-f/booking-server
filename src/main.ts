import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite apenas requests de um domínio específico
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept', // Cabeçalhos permitidos
    credentials: true, // Permite o envio de cookies
  });
  // await app.listen(3000);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
