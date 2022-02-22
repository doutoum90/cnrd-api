import { NestFactory } from '@nestjs/core';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://cnrd-front.herokuapp.com/home'],
  });

  /*  const option = new DocumentBuilder()
    .setTitle('CNRD')
    .setDescription("Documentation de l'api")
    .setVersion('1.0')
    .addTag('CNRD')
    .build();
  const docume = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('docs', app, docume); */
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
