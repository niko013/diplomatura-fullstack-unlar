
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_PORT: number
    DB_NAME: string
    PORT: number
}

const envsSchema= joi.object({
    DB_HOST: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_PORT: joi.number().port().required(),
    DB_NAME: joi.string().required(),
    PORT: joi.number().port().required()
}).unknown(true);

const {error, value} = envsSchema.validate(process.env) // tenemos que importar import 'dotenv/config'; para leer las variables de entorno

if(error){
    throw new Error(`Error en las validacion de las variables de entorno ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    dbHost: envVars.DB_HOST,
    dbUser: envVars.DB_USER,
    dbPassword: envVars.DB_PASSWORD,
    dbPort: envVars.DB_PORT,
    dbName: envVars.DB_NAME,
    port: envVars.PORT
}

