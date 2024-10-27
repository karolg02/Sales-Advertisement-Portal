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
    Query, UseGuards
} from '@nestjs/common';
import {YsaService} from "./ysa.service";
import {CreateYsaDto} from "./dto/create-ysa.dto";
import {YsaNotfoundException} from "../../exceptions/ysa-notfound-exception";
import {EditYsaDto} from "./dto/edit-ysa.dto";
import {FilterYsaDto} from "./dto/filter-ysa.dto";
import {TokenGuard} from "../auth/token.guard";
import {UserID} from "../auth/user.decorator";

@Controller('ysa')
export class YsaController {

    constructor(private ysaService: YsaService) {

    }

    @Get()
    @UseGuards(TokenGuard)
    ysaListOffer(@Query() filter: FilterYsaDto, @UserID() userid: number){
        return this.ysaService.ysaListOffer(filter, userid);
    }

    @Get(":id")
    @UseGuards(TokenGuard)
    async getYsaListOffer(@Param("id", ParseIntPipe) id: number, @UserID() userid: number) {
        const response = await this.ysaService.ysaGetById(id, userid);
        if(!response){
            throw new YsaNotfoundException();
        }
        return response;
    }


    @Post()
    @UseGuards(TokenGuard)
    ysaAddOffer(@Body()data: CreateYsaDto,@UserID() userid: number){
        return this.ysaService.ysaAddOffer(data,userid);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(TokenGuard)
    async ysaDeleteOffer(@Param("id", ParseIntPipe) id: number,@UserID() userid: number) {
        const response = await this.ysaService.ysaGetById(id, userid);
        if(!response){
            throw new YsaNotfoundException();
        }
        await this.ysaService.ysaDeleteOffer(id,userid);
    }

    @Put(":id")
    @UseGuards(TokenGuard)
    async ysaUpdateOffer(@Param("id", ParseIntPipe) id: number,@Body() data: EditYsaDto,@UserID() userid: number) {
        const response = await this.ysaService.ysaGetById(id,userid);
        if(!response){
            throw new YsaNotfoundException();
        }
        return this.ysaService.ysaEditOffer(id,data);
    }
}
