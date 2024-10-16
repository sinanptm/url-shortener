import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:{
      origin:process.env.CLIENT_URL,
      allowedHeaders:"*",
      credentials:true
    }
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )
  await app.listen(process.env.PORT);
}

bootstrap();
