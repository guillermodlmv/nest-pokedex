import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';

import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
@Module({
  imports: [
    // Sirve para configurar las variables de entorno del .env
    ConfigModule.forRoot({
      load: [ EnvConfiguration ],
      validationSchema: JoiValidationSchema
    }),
    // Requerido para mostrar contenido estatico (HTML);
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    // Conexion a base de datos mongo
    MongooseModule.forRoot( process.env.MONGODB, {
      dbName: 'pokemonsdb'
    } ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
