import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setea un prefijo para las peticiones, por ejemplo pasaria de /pokemon -> /api/v2/pokemon
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // Configuracion para hacer la conversion de los query params automaticamente por el tipo definido en el dto.
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  await app.listen( process.env.PORT );
  console.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
