import { IsArray, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class getMoviesQueriesDto {

  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  color?: string;
  milage?: number;
  
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsArray()
  @IsOptional()
  fields?: string;

  @IsString()
  @IsOptional()
  sort?: string;
}
