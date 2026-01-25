import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://admin:admin@localhost:5672'],
  //     queue: 'notifications_queue',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3001);
  console.log("Server running on port", process.env.PORT ?? 3001);
}
bootstrap();
