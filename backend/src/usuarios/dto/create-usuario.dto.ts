import { IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
    nombre: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El apellido no puede superar los 100 caracteres' })
    apellido: string;

    @IsNotEmpty({ message: 'El usuario es obligatorio' })
    @IsString({ message: 'El usuario debe ser una cadena de texto' })
    @MinLength(3, { message: 'El usuario debe tener al menos 3 caracteres' })
    @MaxLength(100, { message: 'El usuario no puede superar los 100 caracteres' })
    usuario: string;

    @IsNotEmpty({ message: 'La clave es obligatoria' })
    @IsString({ message: 'La clave debe ser una cadena de texto' })
    @MinLength(6, { message: 'La clave debe tener al menos 6 caracteres' })
    @MaxLength(100, { message: 'La clave no puede superar los 100 caracteres' })
    clave: string;

}
