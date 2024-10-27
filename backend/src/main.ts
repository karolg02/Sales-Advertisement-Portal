import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // conversion of types
    whitelist: true, //remove properties not presenet in dto
    forbidNonWhitelisted: true,
  }));

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
