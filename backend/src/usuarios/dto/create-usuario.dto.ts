import { IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsOptional()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    apellido: string;

    @IsOptional()
    @IsString()
    usuario: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'La clave debe tener al menos 8 caracteres' })
    clave: string;

}
