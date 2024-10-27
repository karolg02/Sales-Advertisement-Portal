import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YsaModule } from './modules/ysa/ysa.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [YsaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
