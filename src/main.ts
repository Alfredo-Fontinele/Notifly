import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`\nServer is running in http://localhost:${PORT} 🚀🚀🚀\n`);
  });
}

bootstrap();
