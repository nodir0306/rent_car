import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { loggerMiddleware } from './middlewares/logger.middleware';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  if(process.env.NODE_ENV.trim() == "development"){
    app.use(morgan('tiny'))
  }
  app.useGlobalPipes(new ValidationPipe())
  app.use(new loggerMiddleware().use)
  await app.listen(3000,(): void=>console.log("server is running"));
}
startApp();
