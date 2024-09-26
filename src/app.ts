import { Module, ValidationPipe } from '@nestjs/common';
import { CarsModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { ExceptionHandleFilter } from './filters';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CheckRolesGuard } from '@guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    CarsModule,
  ],
  providers: [
    {
      useClass: ExceptionHandleFilter,
      provide: APP_FILTER,
    },
    {
      useClass: CheckRolesGuard,
      provide: APP_GUARD
    }
  ],
})
export class AppModule {}
