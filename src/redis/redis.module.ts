import { Module } from '@nestjs/common';
import { createClient } from 'redis';



@Module({
    providers:[{
        provide: 'REDIS_CONNECT',
        useFactory: async() => {
            const client = createClient( {url: 'redis://localhost:6379'} )
            await client.connect()
            return client
        },
    }],

    exports: ['REDIS_CONNECT']
})
export class RedisModule {}
