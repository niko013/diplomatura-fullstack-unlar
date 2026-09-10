import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {

@IsOptional()
@IsString()
nombre:string;



}
