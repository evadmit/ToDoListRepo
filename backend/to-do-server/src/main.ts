import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport = require('passport');
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  await app.listen(3003);
  app.use(passport.initialize());
app.use(passport.session());

}
bootstrap();
