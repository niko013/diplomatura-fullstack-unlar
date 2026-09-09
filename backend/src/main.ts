import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { envs } from './common/config/envs';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';

async function bootstrap() {

  const logger = new Logger('Main-Bootstrap')

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api') 

  // Registrar el interceptor globalmente
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.enableCors(); Cuando se suba a produccion se habilita el CORS para que solo acepte peticiones de otro dominio

  //Al activarlo de forma global (useGlobalPipes), la regla se aplica automáticamente a todos los endpoints de tu aplicación que utilicen DTOs (Data Transfer Objects) con decoradores de class-validator (como @IsString(), @IsNumber(), @IsNotEmpty(), etc.).
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
    );

  await app.listen(envs.port ?? 3000);

  logger.log(`Aplicacion corriendo en el puerto ${envs.port ?? 3000}`)
}

bootstrap();
