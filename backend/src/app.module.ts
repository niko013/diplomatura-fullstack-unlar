import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

import { CategoriasModule } from './categorias/categorias.module';
import { databaseConfig } from '@common/config/database.config';

@Module({
  imports: [
    // ConfigModule.forRoot({isGlobal: true}), //sirve para cargar las variables de entorno de tu archivo .env en toda la aplicación sin tener que importar el ConfigModule en cada uno de tus módulos de negocio
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    ProductosModule,
    UsuariosModule,
    SeedModule,
    AuthModule,
    CategoriasModule],

})
export class AppModule {}
