import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CarsService } from "./car.service";
import { createCarDto, UpdateCarDto } from "./dtos";


@Controller("cars")
export class CarsController {
    constructor(private readonly carsService: CarsService){}
    

    @Post()
    async createCar(@Body() createCarData: createCarDto): Promise<any>{
        return this.carsService.createCar(createCarData)
    }
    @Get()
    async getAllCars(@Query() queryies: Record<string, string>): Promise<any[]>{
        return this.carsService.getAllCar(queryies)
    }

    @Get("/:carId")
    async getOneCar(@Param("carId") carId: string): Promise<any>{
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