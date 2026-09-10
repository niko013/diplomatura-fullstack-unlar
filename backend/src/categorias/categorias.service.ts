import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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
  ){}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try{
      const categoria = this.categoriasRepository.create(createCategoriaDto);
      await this.categoriasRepository.save(categoria);
      return categoria;
    }
    catch(error){
      handleDBException(error, this.logguer);
    }
  }

  findAll() {
    return this.categoriasRepository.find({
      order: {id: 'ASC'}
    });
  }

  async findOne(id: number) {
    return await this.categoriasRepository.findOneBy({id})
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new BadRequestException(`Categoria no encontrada: ${id}`);
    }
    await this.categoriasRepository.remove(categoria);
    throw new BadRequestException(`categoria Eliminado: ${id}`);
  }
}
