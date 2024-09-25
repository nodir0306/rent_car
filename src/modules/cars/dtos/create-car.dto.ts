import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { createCarRequests } from "../interfaces";

export class CreateCarDto implements createCarRequests {
    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsInt()
    year: number;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    milage: number;

    @IsNotEmpty()
    @IsString()
    color: string;
}
