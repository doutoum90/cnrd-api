import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [process.env.FRONT_LOCAL_URL, process.env.FRONT_URL],
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
  });

  const option = new DocumentBuilder()
    .setTitle('CNRD')
    .setDescription("Documentation de l'api")
    .setVersion('1.0')
    .addTag('CNRD')
    .build();
  const docume = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('docs', app, docume);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
