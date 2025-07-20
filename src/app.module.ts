import { Module } from '@nestjs/common';
import { MainPageModule } from './main_page/main_page.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user_table } from '../entities/user.table';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '434128',
      database: 'redis_course',
      entities: [user_table],
      synchronize: true,
    }),

    MainPageModule,

    RedisModule,
  ],
})
export class AppModule {}


