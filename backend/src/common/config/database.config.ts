import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envs } from "./envs";

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: envs.dbHost,

    port: envs.dbPort,
    database: envs.dbName,
    username: envs.dbUserName,
    password: envs.dbPassword,

    autoLoadEntities: true,  // PARA QUE CARGUE AUTOMATICAMENTE LAS ENTIDADES
    synchronize: true, //EN PRODUCCION NO SE USA
}