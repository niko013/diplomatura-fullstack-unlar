import { IsOptional } from "class-validator";

export class BuscarProductoDto {

@IsOptional()
nombre?: string;

@IsOptional()
desde?: string;

@IsOptional()
  hasta?: string;

}
