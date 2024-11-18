import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import {CreateCommentDto} from "./dto/create-comment.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createUserDto: CreateUserDto) {
        const passHash = await argon2.hash(createUserDto.password);
        try {
            return await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
                    surename: createUserDto.surename,
                    email: createUserDto.email,
                    password: passHash,
                    number: createUserDto.number
                },
            });
        } catch (e){
            if(e.code == 'P2002'){
                throw new ConflictException("Uzytkownik juz istnieje");
            }
        }
    }

    async findOne(userId: number) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }

    postComment(profileId: number, userid: number, data: CreateCommentDto) {
        return this.prisma.comments.create({
            data: {
                userId: userid,
                profileId: profileId,
                text: data.text,
                rating: data.rating,
            }
        })
    }

    getComments(id: number) {
        return this.prisma.comments.findMany({
            where: {
                profileId: id,
            }
        })
    }
}