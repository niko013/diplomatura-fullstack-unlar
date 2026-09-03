import { Producto } from "src/productos/entities/producto.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categorias' })

export class Categoria {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({ length: 100, unique: true })
    nombre: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];

    @CreateDateColumn({ name: 'creado_el' })
    creadoEl: Date;

    @UpdateDateColumn({ name: 'actualizado_el' })
    actualizadoEl: Date;
}


//TODO:
// @OneToMany(...): Indica que es una relación Uno a Muchos (1 Categoría → N Productos).

// () => Producto: Le señala a TypeORM cuál es la entidad relacionada (la tabla Producto).

// (producto) => producto.categoria: Es el mapa de retorno. Le explica a TypeORM en qué propiedad de la entidad Producto está definida la relación @ManyToOne hacia la categoría.

// productos: Producto[];: Es un arreglo TypeScript. Cuando hagas una consulta solicitando la categoría junto con sus productos, TypeORM llenará este atributo con la lista de productos pertenecientes a esa categoría.

// Diferencia clave: Esta columna NO existe en la base de datos SQL
// Es muy importante notar que esta propiedad sólo existe en el código de NestJS/TypeScript, no crea ninguna columna nueva en la tabla categorias de SQL.

// En la Base de Datos (SQL): Solo la tabla productos tiene la columna física categoria_id.

// En NestJS (TypeORM): @OneToMany funciona como un "puente virtual" para que puedas hacer consultas bidireccionales.