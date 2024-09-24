import { Module } from "@nestjs/common";

import { PgService } from "src/postgres/pg.service";
import { CarsService } from "./car.service";
import { CarsController } from "./car.controller";

@Module({
    providers: [PgService,CarsService],
    controllers: [CarsController],
})
export class CarsModule {}