import { Injectable, Logger, NotFoundException,  } from '@nestjs/common';
import { handleDBException } from '@common/helpers/handle-db-exception.helper';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { isUUID } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuariosService {

  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const {clave, ...usuarioData} = createUsuarioDto;

    try{
      const usuarios = this.usuariosRepository.create({
        ...usuarioData,
        clave: bcrypt.hashSync(clave, 10)
      });
      await this.usuariosRepository.save(usuarios);
      return usuarios;
    }catch(error){
      handleDBException(error, this.logger)
    }
  }

  async findAll(){
    return this.usuariosRepository.find({
      order: {creadoEl: 'DESC'}
    })
  }

  async findOne(term: string) {
    console.log('Termino',term);
    const usuario = await this.usuariosRepository.findOneBy(
      isUUID(term)
      ?{id: term}
      :{nombre: ILike(`%${term.trim()}%`) }
    )
    if (!usuario) {
      throw new NotFoundException(`Usuario con término '${term}' no encontrado`);
    }
    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(id: string) {
    const usuario = await this.findOne(id)
    if(!usuario){
      throw new NotFoundException(`Usuario no encontrada: ${id}`)
    }
    await this.usuariosRepository.remove(usuario)
    return {message: `Usuario con ID:'${id}' eliminado con éxito` }
  }


  async deleteAllUsers() {
    const query = this.usuariosRepository.createQueryBuilder('usuariosremove')
    try {
      return await query.delete().where({}).execute() // Elimina todos los usuarios de la base de datos
    } catch (error) {
      handleDBException(error, this.logger )
    }
  }

} 
