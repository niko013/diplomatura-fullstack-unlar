import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { handleDBException } from '@common/helpers/handle-db-exception.helper';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

import {isUUID} from 'class-validator';

@Injectable()
export class ProductosService {

  private readonly logger = new Logger('ProductosService')

  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>
  ){}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const nuevoProducto = this.productosRepository.create({
        ...createProductoDto,
        categoria: {id:createProductoDto.categoriaId}  //Al pasarle un objeto con la forma { id: el_numero_de_id }, TypeORM entiende automáticamente que debe relacionar este producto con esa categoría. Esto es una excelente práctica porque te ahorra hacer una consulta extra a la base de datos (no necesitás hacer un findOne de la categoría antes de crear el producto).
      })

      return await this.productosRepository.save(nuevoProducto);
    } catch (error) {
      handleDBException(error, this.logger)
    }
  }

  findAll() {
    return this.productosRepository.find({
       order: {creadoEl: 'DESC'}
    });
  }

  async findOne(term: string) {
    const producto = await this.productosRepository.findOneBy(
      isUUID(term)
      ?{id: term}
      :{nombre: ILike(`%${term.trim()}%`) }
    )
    if(!producto){
      throw new NotFoundException(`Producto con termino '${term}' no encontrado`)
    }
    return producto
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  async remove(id:string) {
    
    const producto = await this.findOne(id)
    if(!producto){
      throw new NotFoundException(`Productono encontrado: ${id}`)
    }
    await this.productosRepository.remove(producto)
    return { message: `Producto con ID:'${id}' eliminado con éxito` };
  }

  async deleteAllUsers() {
    const query = this.productosRepository.createQueryBuilder('productosremove')
    try {
      return await query.delete().where({}).execute() // Elimina todos los usuarios de la base de datos
    } catch (error) {
      handleDBException(error, this.logger )
    }
  }


}
