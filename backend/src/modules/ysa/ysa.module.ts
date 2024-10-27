import { Module } from '@nestjs/common';
import { YsaService } from './ysa.service';
import { YsaController } from './ysa.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [YsaService],
  controllers: [YsaController],
  imports: [PrismaModule]
})
export class YsaModule {}
