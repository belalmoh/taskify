import { NestFactory } from '@nestjs/core';
import { BoardServiceModule } from './board-service.module';

async function bootstrap() {
  const app = await NestFactory.create(BoardServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
