import { Categoria } from "src/categorias/entities/categoria.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'productos'})

export class Producto {

   @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'imagen_url', nullable: true })
  imagenUrl: string;

  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @CreateDateColumn({ name: 'creado_el' })
  creadoEl: Date;

  @UpdateDateColumn({ name: 'actualizado_el' })
  actualizadoEl: Date;

}


//TODO:
// 1. @ManyToOne(() => Categoria, (categoria) => categoria.productos, ...)
// Define la relación Muchos a Uno: Muchos productos pertenecen a Una categoría.

// () => Categoria: Le dice a TypeORM con qué entidad se está conectando. Se usa una función flecha para evitar problemas de referencias circulares durante la carga de archivos en Node.js.

// (categoria) => categoria.productos: Establece la relación inversa. Especifica qué propiedad dentro de la entidad Categoria guarda la lista de productos relacionados.

// 2. onDelete: 'RESTRICT'
// Es una regla de integridad referencial en la base de datos que define qué hacer si alguien intenta eliminar una categoría existente:

// RESTRICT impide el borrado: Si intentas borrar la categoría "Amaderado", pero todavía existen productos asociados a ella en la base de datos, el motor bloqueará la operación y arrojará un error.

// Por qué se eligió: Evita la existencia de "productos huérfanos" sin categoría asignada y previene errores accidentales en la tienda. Si quisieras borrar la categoría, primero deberías reasignar o eliminar los productos asociados a ella.

// 3. @JoinColumn({ name: 'categoria_id' })
// Indica cuál es la columna física en la tabla de la base de datos que guarda la Clave Foránea (Foreign Key):

// Por defecto, TypeORM crearía una columna llamada categoriaId.

// Al especificar { name: 'categoria_id' }, nos aseguramos de que en SQL la columna siga la convención de nomenclatura estándar snake_case (categoria_id), manteniendo coherencia con campos como creado_el y imagen_url.

// 4. categoria: Categoria;
// Es la propiedad dentro del código TypeScript:

// Permite acceder al objeto completo de la categoría asociada al hacer consultas con relaciones en TypeORM (ej. producto.categoria.nombre).