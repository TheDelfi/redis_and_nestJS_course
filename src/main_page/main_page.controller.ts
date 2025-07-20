import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainPageService } from './main_page.service';
import { Request, Response } from 'express';


@Controller()
export class MainPageController {
    
    constructor(
        private readonly service:MainPageService
    ){}

    @Get()
    @Render('main_page')
    async main_page(@Req() req:Request, @Res() res:Response){

        const start = Date.now()
        
        const user_data = await this.service.cache_method(req.cookies['id'])
        
        console.log(`Запрос выполнился за ${Number(Date.now()) - start}мс`)

        return {
            user_data,
        }
    }
}
