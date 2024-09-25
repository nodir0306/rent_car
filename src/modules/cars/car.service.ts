import { HttpException, Injectable, InternalServerErrorException, NotFoundException,} from "@nestjs/common";
import { PgService } from "src/postgres/pg.service";
import { createCarRequests, updateCarRequests } from "./interfaces";

import { allGetFormatter } from "src/utils/api.feture";
export declare interface Car {
    id: number,
    name: string,
    rating: number,
    year: number,
}

@Injectable()

export class CarsService {
    constructor(private readonly postgres: PgService){}
    async createCar(newCarBody: createCarRequests): Promise<any> {
        try {
            return await this.postgres.fetchData(
                'INSERT INTO cars (brand, model, year, price, color, milage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                newCarBody.brand,
                newCarBody.model,
                newCarBody.year,
                newCarBody.price,
                newCarBody.color,
                newCarBody.milage
              );
        } catch (error) {
            throw new HttpException(error.response.message, error.response.statusCode);
        }
    }
    async getAllCar(queryies: Record<string, string>): Promise<any>{
        try {
            const query = new allGetFormatter('cars')
            .paginate(+queryies?.page ? +queryies?.page : 1, +queryies?.limit ? +queryies?.limit : 10)
            .limitFields(queryies?.fields ? queryies?.fields.split(',') : ['*'])
            .sort(queryies?.sort)
            .getQuery()

      
          const data = await this.postgres.fetchData(query.queryString);
          return {
            page: query.page,
            limit: query.limit,
            data,
          };
        } catch (error) {
            throw new HttpException(error.response.message, error.response.statusCode);
        }
    }

    async getOneCar(carId: number): Promise<any>{
        try {
            const foundedCar = this.postgres.fetchData('SELECT * FROM cars WHERE id = $1',carId)
            if(!foundedCar){
                throw new NotFoundException("car not found")
            }
            return foundedCar
        } catch (error) {
            throw new HttpException(error.response.message, error.response.statusCode);
        }
    }

    async updateCar(carId: number, updateCarBody: updateCarRequests): Promise<any> {
        try {
            const foundedCar = await this.postgres.fetchData('SELECT * FROM cars WHERE id = $1', carId);
            console.log(foundedCar)
            if (!foundedCar) {
                throw new NotFoundException("Car not found");
            }

    
            return await this.postgres.fetchData(
                'UPDATE cars SET brand = $1, model = $2, year = $3, price = $4, color = $5, milage = $6 WHERE id = $7 RETURNING *',
                updateCarBody?.brand ? updateCarBody.brand : foundedCar?.brand,
                updateCarBody?.model ? updateCarBody.model : foundedCar?.model,
                updateCarBody?.year ? updateCarBody.year : foundedCar?.year,
                updateCarBody?.price ? updateCarBody.price : foundedCar?.price,
                updateCarBody?.color ? updateCarBody.color : foundedCar?.color,
                updateCarBody?.milage ? updateCarBody.milage : foundedCar?.milage,
                carId
            );
        } catch (error) {
            throw new HttpException(error.response?.message, error.message, error.response?.statusCode);
        }
    }
    

    async deleteCar(carId: number): Promise<any>{
        try {
            const foundedCar = this.postgres.fetchData('SELECT * FROM cars WHERE id = $1',carId)
            if(!foundedCar){
                throw new NotFoundException("car not found")
            }
            this.postgres.fetchData('DELETE FROM cars WHERE id = $1',carId)
            return "Deleted succes"
        } catch (error) {
            throw new HttpException(error.response.message, error.response.statusCode);
        }
    }
    
    
    

    
}