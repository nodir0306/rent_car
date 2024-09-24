import { Module } from '@nestjs/common';
import { CarsModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    }),
    CarsModule],
  
})
export class AppModule {}
