import {Module} from '@nestjs/common';
import {PrismaModule} from "../prisma/prisma.module";
import {CartService} from "./cart.service";
import {CartController} from "./cart.controller";
import {YsaController} from "../ysa/ysa.controller";
import {YsaService} from "../ysa/ysa.service";

@Module({
    providers: [CartService,YsaService],
    controllers: [CartController],
    imports: [PrismaModule]
})
export class CartModule {}
