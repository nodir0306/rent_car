import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { loggerMiddleware } from './middlewares/logger.middleware';
import * as morgan from 'morgan';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV.trim() == 'development') {
    app.use(morgan('tiny'));
  }
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        const errorMsgs = errors.map(err => Object.values(err.constraints).join(', '))
        throw new BadRequestException(errorMsgs.join(' && '));
     
      },
    }),
  );
  app.use(new loggerMiddleware().use);
  await app.listen(3000, (): void => console.log('server is running'));
}
startApp();
