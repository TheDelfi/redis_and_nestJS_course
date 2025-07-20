import { Module } from '@nestjs/common';
import { MainPageController } from './main_page.controller';
import { MainPageService } from './main_page.service';
import { RedisModule } from '../redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user_table } from '../../entities/user.table';

@Module({
  imports: [RedisModule,
    TypeOrmModule.forFeature([user_table])
  ],
  controllers: [MainPageController],
  providers: [MainPageService]
})
export class MainPageModule {}
