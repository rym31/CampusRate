import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { configureSwagger } from './configure-swagger';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.useBodyParser('json', { limit: '5kb' });

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS', '').split(','),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  configureSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
