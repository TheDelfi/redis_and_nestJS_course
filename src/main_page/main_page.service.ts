import { Inject, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user_table } from '../../entities/user.table';
import { Request } from 'express';
import { RedisClientType } from 'redis';
import { Repository } from 'typeorm';

@Injectable()
export class MainPageService {
    constructor(
        @Inject('REDIS_CONNECT') private readonly redis: RedisClientType,
        @InjectRepository(user_table)
        private TUser: Repository<user_table>,
    ){}

    async main_method(){

        const result = await this.redis.exists('server_restart')
        
        if(result){
            this.redis.incr('server_restart')
        }

        return
    }

    async main_method_two(id){
        const start = Date.now()
        const check_value = await this.redis.hExists(`user:${id}`,'id')
        if(check_value){
            const user_data = await this.redis.hGet(`user:${id}`,'name')
            console.log(Number(Date.now()) - start)
            return user_data
        }
        else{
            return false
        }
    }


    async cache_method(id){
        const cache_availability = await this.redis.hExists(`user:${id}`,'id')
        if(cache_availability){
            const user_info = await this.redis.hGetAll(`user:${id}`)
            return user_info
        }
        else{
            const user_info_DB = await this.TUser.createQueryBuilder('user')
            .select(['user.id','user.name','user.password'])
            .where('user.id = :id',{id,})
            .getOne()
            if(user_info_DB){
                await this.redis.HSET(`user:${id}`,[
                    'id', user_info_DB?.id,
                    'name', user_info_DB?.name,
                    'password', user_info_DB.password
                ])
                await this.redis.expire(`user:${id}`, 30);
            }
            return user_info_DB
        }
    }
}
