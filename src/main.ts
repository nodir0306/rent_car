import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000,(): void=>console.log("server is running"));
}
startApp();
