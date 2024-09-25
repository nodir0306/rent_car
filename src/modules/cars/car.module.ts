import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

import { PgService } from "src/postgres/pg.service";
import { CarsService } from "./car.service";
import { CarsController } from "./car.controller";
import { loggerMiddleware } from "src/middlewares/logger.middleware";

@Module({
    providers: [PgService,CarsService],
    controllers: [CarsController],
})
export class CarsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(loggerMiddleware).forRoutes('/cars')
    }
}