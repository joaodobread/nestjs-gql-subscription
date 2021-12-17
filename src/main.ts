import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .listen(8080)
    .then(async () =>
      Logger.log(
        `App running at: ${await app.getUrl()}`,
        'ApplicationBootstrap',
      ),
    );
}
bootstrap();
