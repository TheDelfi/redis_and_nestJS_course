import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
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

        const visits = await this.service.link_HLL_visits()
        const start = Date.now()
        
        const user_data = await this.service.cache_method(req.cookies['id'])
        
        console.log(`Запрос выполнился за ${Number(Date.now()) - start}мс`)
        

        return {
            user_data,
            visits,
        }
    }

    @Post('linkHLL')
    async main_page_link_request(@Req() req:Request, @Body() body:any){
        this.service.link_HLL(body.link_id, req.cookies['id'])
        const visits = await this.service.link_HLL_visits()
        return {
            visits
        }
    }
}
