import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SemillaModule } from './semilla/semilla.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), ProductosModule, UsuariosModule, SemillaModule, SeedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(
    private readonly configService: ConfigService
  ){}

}
