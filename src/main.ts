import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path'
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useStaticAssets(path.join(__dirname, '..', 'static'),{
    prefix:'/static'
  });  
  app.setBaseViewsDir(path.join(__dirname,'..','template'))
  
  app.use(cookieParser())
  app.setViewEngine('ejs')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
