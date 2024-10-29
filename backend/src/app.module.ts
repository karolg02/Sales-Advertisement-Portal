import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YsaModule } from './modules/ysa/ysa.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartService } from './modules/cart/cart.service';
import { CartController } from './modules/cart/cart.controller';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),YsaModule, PrismaModule, TokenModule, UserModule, AuthModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
