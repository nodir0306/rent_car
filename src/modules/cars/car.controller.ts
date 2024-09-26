import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { CarsService } from "./car.service";
import { CreateCarDto, UpdateCarDto } from "./dtos";
import { ExceptionHandleFilter } from "src/filters";
import { CarTypeEnum, CheckEnum, ParseIntCustomPipe } from "@pipes";
import { LoggingInterceptor } from "@inceptors";
import { CheckRolesGuard } from "@guards";
import { Roles } from "@decorators";


@Controller("cars")
@UseInterceptors(LoggingInterceptor)
export class CarsController {
    constructor(private readonly carsService: CarsService){}
    
    @Roles(["admin"])
    @Post()
    async createCar(@Body() createCarData: CreateCarDto): Promise<any>{
        return this.carsService.createCar(createCarData)
    }
    @UseFilters(ExceptionHandleFilter)
    @Get()
    async getAllCars(@Query() queryies: Record<string, string>): Promise<any[]>{
        return this.carsService.getAllCar(queryies)
    }


    @Get("/:carId")
    async getOneCar(@Param("carId", ParseIntPipe) carId: string): Promise<any>{
        return this.carsService.getOneCar(+carId)
    }

    @Patch("/:carId")
    async updateCar(@Param("carId") carId: string, @Body() updateCardata: UpdateCarDto): Promise<any>{
        return this.carsService.updateCar(+carId,updateCardata)
    }

    
    @Delete("/:carId")
    async deleteCar(@Param("carId") carId: string): Promise<any>{
        return this.carsService.deleteCar(+carId)
    }
}