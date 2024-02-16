import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require ('dotenv').config()
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  let PORT = process.env.PORT
  await app.listen(PORT);
}
bootstrap();
