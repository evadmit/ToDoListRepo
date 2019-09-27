import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport = require('passport');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3003);
  app.use(passport.initialize());
app.use(passport.session());

}
bootstrap();
