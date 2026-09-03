import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

import { envs } from './common/config/envs';
import { CategoriasModule } from './categorias/categorias.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,

      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUserName,
      password: envs.dbPassword,

      autoLoadEntities: true,  // PARA QUE CARGUE AUTOMATICAMENTE LAS ENTIDADES
      synchronize: true, //EN PRODUCCION NO SE USA
    }),
    ProductosModule,
    UsuariosModule,
    SeedModule,
    AuthModule,
    CategoriasModule],

})
export class AppModule {



}
