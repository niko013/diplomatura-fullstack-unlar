import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })

export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })  //
    nombre: string;

    @Column({ length: 100 })
    apellido: string;

    @Column({ unique: true, length: 100 })
    usuario: string;

    @Column({ select: false }) // Evita traer la contraseña por defecto en consultas
    clave: string;

    @CreateDateColumn({ name: 'creado_el' })
    creadoEl: Date;

    @UpdateDateColumn({ name: 'actualizado_el' })
    actualizadoEl: Date;
}

//TODO: cuando se pone el length en el column, no hace falta poner el Column('text')
