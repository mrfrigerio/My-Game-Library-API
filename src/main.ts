import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 3033);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
