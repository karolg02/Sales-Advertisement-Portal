import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {CartService} from "./cart.service";
import {UserID} from "../auth/user.decorator";
import {TokenGuard} from "../auth/token.guard";
import {addCartDto} from "./dto/addToCart.dto";
import {YsaNotfoundException} from "../../exceptions/ysa-notfound-exception";
import {YsaService} from "../ysa/ysa.service";

@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService,
        private ysaService: YsaService
    ) {}


    @Get()
    @UseGuards(TokenGuard)
    async getCart(@UserID() userid: number) {
        return this.cartService.getMyCart(userid);
    }

    @Post(":id")
    @UseGuards(TokenGuard)
    async addToCart(@Body() addCartDto: addCartDto,@Param("id", ParseIntPipe) id: number,@UserID() userid: number){
        const response = await this.ysaService.ysaGetById(id);
        if(!response){
            throw new YsaNotfoundException();
        }
        return this.cartService.addToCart(addCartDto,id, userid);
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
}
