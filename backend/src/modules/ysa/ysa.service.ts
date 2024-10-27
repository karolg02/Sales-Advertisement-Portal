import {Injectable} from '@nestjs/common';
import {CreateYsaDto} from "./dto/create-ysa.dto";
import {PrismaService} from "../prisma/prisma.service";
import {EditYsaDto} from "./dto/edit-ysa.dto";
import {FilterYsaDto} from "./dto/filter-ysa.dto";

@Injectable()
export class YsaService {


    constructor(private readonly prisma: PrismaService) {
    }

    async ysaListOffer(filter: FilterYsaDto) {
        return this.prisma.ysa.findMany({
            where: filter.category ? { category: filter.category } : undefined,
            orderBy: {
                [filter.sortBy]: filter.sortOrder,
            },
        });
    }

    async ysaAddOffer(data: CreateYsaDto, userid: number){
        return this.prisma.ysa.create({
            data: {
                title: data.title,
                description: data.description,
                image: data.image,
                price: data.price,
                amount: data.amount,
                category: data.category,
                city: data.city,
                userId: userid,
            },
        })
    }

    ysaEditOffer(id: number, data: EditYsaDto){
        return this.prisma.ysa.update({
            where: {
                id: id,
            },
            data: data,
        })
    }

    ysaDeleteOffer(id: number){
        return this.prisma.ysa.delete({
            where: {
                id: id,
            }
        })
    }

    ysaGetById(id: number) {
        return this.prisma.ysa.findUnique({
            where: {
                id: id,
            }
        })
    }
    async findOne(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }
}
