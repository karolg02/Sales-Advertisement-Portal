import {Injectable} from '@nestjs/common';
import {CreateYsaDto} from "./dto/create-ysa.dto";
import {PrismaService} from "../prisma/prisma.service";
import {EditYsaDto} from "./dto/edit-ysa.dto";
import {FilterYsaDto} from "./dto/filter-ysa.dto";
import {postPhoto} from "./dto/postPhoto.dto";

@Injectable()
export class YsaService {


    constructor(private readonly prisma: PrismaService) {
    }

    async ysaListOffers(filter: FilterYsaDto) {
        const page = filter.page || 1;
        const take = 30; // ile elementow ma pobrac
        const skip = (page - 1) * take;
        return this.prisma.ysa.findMany({
            where: {
                category: filter.category || undefined,
                title: filter.title ? { contains: filter.title} : undefined,
                price: {
                    gte: filter.lowerPrice || undefined,
                    lte: filter.upperPrice || undefined,
                }
            },
            orderBy: {
                [filter.sortBy]: filter.sortOrder,
            },
            skip: skip,
            take: take,
        });
    }

    async ysaAddOffer(data: CreateYsaDto, userId: number) {
        const newOffer = await this.prisma.ysa.create({
            data: {
                title: data.title,
                description: data.description,
                image: data.image,
                price: data.price,
                amount: data.amount,
                category: data.category,
                city: data.city,
                userId: userId,
            },
        });
        return { id: newOffer.id };
    }

    ysaEditOffer(id: number, data: EditYsaDto){
        return this.prisma.ysa.update({
            where: {
                id: id,
            },
            data: data,
        })
    }

    async ysaDeleteOffer(id: number, userid: number) {
        try {
            await this.prisma.cart.deleteMany({
                where: {
                    ysaId: id,
                },
            });

            return await this.prisma.ysa.delete({
                where: {
                    id: id,
                    userId: userid,
                },
            });
        } catch (error) {
            throw new Error(`Nie udało się usunąć oferty. Szczegóły błędu: ${error.message}`);
        }
    }

    ysaGetById(id: number) {
        return this.prisma.ysa.findUnique({
            where: {
                id: id,
            }
        })
    }
    ysaGetMyOfferById(id: number, userid: number) {
        return this.prisma.ysa.findUnique({
            where: {
                id: id,
                userId: userid
            }
        })
    }

    getMyOffers(userid: number) {
        return this.prisma.ysa.findMany({
            where: {
                userId: userid
            }
        })
    }

    async getPhotos(id: number) {
        return this.prisma.photos.findMany({
            where: {
                ysaId: id,
            }
        })
    }

    postPhotos(id: number, data: postPhoto) {
        return this.prisma.photos.create({
            data: {
                ysaId: id,
                url: data.url,
            }
        })
    }
}
