import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseFilters } from "@nestjs/common";
import { CarsService } from "./car.service";
import { CreateCarDto, UpdateCarDto } from "./dtos";
import { ExceptionHandleFilter } from "src/filters";
import { ParseIntCustomPipe } from "@pipes";


@Controller("cars")
export class CarsController {
    constructor(private readonly carsService: CarsService){}
    

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
    async getOneCar(@Param("carId", ParseIntCustomPipe) carId: string): Promise<any>{
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