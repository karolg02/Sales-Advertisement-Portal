import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from '@nestjs/common';
import {CartService} from "./cart.service";
import {UserID} from "../auth/user.decorator";
import {TokenGuard} from "../auth/token.guard";
import {addCartDto} from "./dto/addToCart.dto";
import {InCart, WrongAmount, YsaNotfoundException} from "../../exceptions/ysa-notfound-exception";
import {YsaService} from "../ysa/ysa.service";
import {plainToInstance} from "class-transformer";
import {ItemsDto} from "./dto/item.dto";

@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService,
        private ysaService: YsaService
    ) {}


    @Get()
    @UseGuards(TokenGuard)
    async getCart(@UserID() userid: number) {
        const response = await this.cartService.getMyCart(userid);
        return plainToInstance(ItemsDto, response);
    }

    @Post(":id")
    @UseGuards(TokenGuard)
    async addToCart(@Body() addCartDto: addCartDto,@Param("id", ParseIntPipe) id: number,@UserID() userid: number){
        // czy istnieje
        // czy to nie jest oferta tego samego uzytkownika
        const response = await this.ysaService.ysaGetById(id);
        if(!response || response.userId===userid){
            throw new YsaNotfoundException();
        }
        // czy jest juz w koszyku
        const response2 = await this.cartService.isInCart(id,userid);
        if(response2.length>0){
            throw new InCart();
        }
        // czy ilosc sie zgadza
        if(response.amount<addCartDto.amount){
            throw new WrongAmount();
        }
        // dodawanie do koszyka
        const response4 = this.cartService.addToCart(addCartDto,id, userid);
        return plainToInstance(ItemsDto, response4);
    }

    @Delete(":id")
    @UseGuards(TokenGuard)
    async deleteFromCart(@Param("id", ParseIntPipe) id: number,@UserID() userid: number) {
        return this.cartService.deleteFromCart(id,userid);
    }
    @Delete()
    @UseGuards(TokenGuard)
    async deleteAll(@UserID() userid: number) {
        return this.cartService.deleteAll(userid);
    }

    @Put(":id")
    @UseGuards(TokenGuard)
    async editCart(@Body() addCartDto: addCartDto,@Param("id", ParseIntPipe) id: number,@UserID() userid: number) {
        const response = await this.ysaService.ysaGetById(id);
        if(response.amount<addCartDto.amount || addCartDto.amount<=0){
            throw new WrongAmount();
        }
        return this.cartService.editCart(id,addCartDto,userid);
    }
}
