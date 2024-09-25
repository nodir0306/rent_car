import { IsNumber, IsString } from "class-validator";
import { createCarRequests } from "../interfaces";

export class CreateCarDto implements createCarRequests {
    @IsString()
    brand: string;

    @IsString()
    model: string;

    @IsNumber()
    year: number;

    @IsNumber()
    price: number;

    @IsNumber()
    milage: number;

    @IsString()
    color: string;
}
