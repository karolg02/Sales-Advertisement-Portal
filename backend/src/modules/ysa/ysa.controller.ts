import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query
} from '@nestjs/common';
import {YsaService} from "./ysa.service";
import {CreateYsaDto} from "./dto/create-ysa.dto";
import {YsaNotfoundException} from "../../exceptions/ysa-notfound-exception";
import {EditYsaDto} from "./dto/edit-ysa.dto";
import {FilterYsaDto} from "./dto/filter-ysa.dto";

@Controller('ysa')
export class YsaController {

    constructor(private ysaService: YsaService) {

    }

    @Get()
    ysaListOffer(@Query() filter: FilterYsaDto){
        return this.ysaService.ysaListOffer(filter);
    }

    @Get(":id")
    async getYsaListOffer(@Param("id", ParseIntPipe) id: number) {
        const response = await this.ysaService.ysaGetById(id);
        if(!response){
            throw new YsaNotfoundException();
        }
        return response;
    }


    @Post()
    ysaAddOffer(@Body()data: CreateYsaDto){
        return this.ysaService.ysaAddOffer(data);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async ysaDeleteOffer(@Param("id") id: number) {
        const response = await this.ysaService.ysaGetById(id);
        if(!response){
            throw new YsaNotfoundException();
        }
        await this.ysaService.ysaDeleteOffer(id);
    }

    @Put(":id")
    async ysaUpdateOffer(@Param("id", ParseIntPipe) id: number,@Body() data: EditYsaDto) {
        const response = await this.ysaService.ysaGetById(id);
        if(!response){
            throw new YsaNotfoundException();
        }
        return response;
    }
}
