import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';

import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response/response.interceptor';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

   @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  //http://localhost:3000/api/usuarios/Nicolas
  @Get(':term')
   findOne(@Param('term') term: string) {
    return this.usuariosService.findOne(term);
  }

  //http://localhost:3000/api/usuarios?term=Juan
  // @Get('/id')
  //  findOne(@Query('term') term: string) {
  //   return this.usuariosService.findOne(term);
  // }

 
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { 
    return this.usuariosService.remove(id);
  }
}
