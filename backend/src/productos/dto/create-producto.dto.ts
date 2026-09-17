import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MaxLength, Min } from "class-validator";
import { Column } from "typeorm";

export class CreateProductoDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio' }) //Para qué sirve: Garantiza que la propiedad no sea undefined, null ni una cadena de texto vacía ("").
    @IsString()
    @MaxLength(150, { message: 'El nombre no puede superar los 100 caracteres' })
    @Column({ length: 150, unique: true })
    nombre: string;

    @IsOptional()
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    descripcion?: string;

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @IsNumber(                                                               //acepta tanto enteros como decimales/flotantes). Permite pasar configuraciones como maxDecimalPlaces para limitar los decimales.
      { maxDecimalPlaces: 2 },                                              // precio: 10.5 -> Pasa,  10.55 -> Pasa, 10.555 -> No Pasa
      { message: 'El precio debe ser un número con máximo 2 decimales' }
    )
    @Min(0, { message: 'El precio no puede ser negativo' })
    precio: number;

    @IsOptional()
    @IsInt({ message: 'El stock debe ser un número entero' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock?: number;

    @IsOptional()
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' }) //Verifica que la cadena sea una URL bien formada con protocolo (http:// o https://)
    imagenUrl?: string;

    @IsNotEmpty({ message: 'La categoría es obligatoria' })
    @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
    @IsPositive({ message: 'El ID de la categoría debe ser un ID válido' })
    categoriaId: number;
}




