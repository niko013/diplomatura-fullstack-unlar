import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

import { handleDBException } from '@common/helpers/handle-db-exception.helper';

@Injectable()
export class CategoriasService {

  private readonly logguer = new Logger('CategoriasService')

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>
  ) { }

  async create(createCategoriaDto: CreateCategoriaDto) {
    // 1. Verificar si la categoría ya existe por nombre // Evisto el Santo de Id en la DB en caso que de ya exista el producto
    const existeCategoria = await this.categoriasRepository.findOneBy({
      nombre: createCategoriaDto.nombre,
    });

    if (existeCategoria) {
      throw new BadRequestException(
        `La categoría con el nombre '${createCategoriaDto.nombre}' ya existe.`,
      );
    }

    try {
      const categoria = this.categoriasRepository.create(createCategoriaDto);
      await this.categoriasRepository.save(categoria);
      return categoria;
    }
    catch (error) {
      handleDBException(error, this.logguer);
    }
  }

  findAll() {
    return this.categoriasRepository.find({
      order: { id: 'ASC' }
    });
  }

  async findOne(id: number) {
    return await this.categoriasRepository.findOneBy({ id })
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria no encontrada: ${id}`);
    }
    await this.categoriasRepository.remove(categoria);
    return { message: `Categoria con ID:'${id}' eliminado con éxito`};
  }
}
