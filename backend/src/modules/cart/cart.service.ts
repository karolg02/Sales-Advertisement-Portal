import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {addCartDto} from "./dto/addToCart.dto";

@Injectable()
export class CartService {

    constructor(private readonly prisma: PrismaService) {
    }

    async getMyCart(userid: number) {
        return this.prisma.cart.findMany({
            where: {
                userId: userid,
            }
        })
    }

    addToCart(addCartDto: addCartDto, id: number, userid: number) {
        return this.prisma.cart.create({
            data: {
                userId: userid,
                ysaId: id,
                amount: addCartDto.amount
            }
        })
    }

    deleteFromCart(id: number, userid: number) {
        return this.prisma.cart.deleteMany({
            where: {
                userId: userid,
                ysaId: id,
            }
        })
    }

    deleteAll(userid: number) {
        return this.prisma.cart.deleteMany({
            where: {
                userId: userid,
            }
        })
    }

    isInCart(id: number, userid: number) {
        return this.prisma.cart.findMany({
            where: {
                ysaId: id,
                userId: userid,
            }
        })
    }

    editCart(id: number, addCartDto: addCartDto, userid: number) {
        return this.prisma.cart.updateMany({
            where: {
                ysaId: id,
                userId: userid,
            },
            data: addCartDto,
        })
    }
}
