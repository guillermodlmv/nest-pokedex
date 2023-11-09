import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    // Requerido para mostrar contenido estatico (HTML);
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    // Conexion a base de datos mongo
    MongooseModule.forRoot('mongodb://localhost:27018/nest-pokemon'),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
