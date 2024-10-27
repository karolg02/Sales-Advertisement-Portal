import { Exclude } from 'class-transformer';
import { User } from '@prisma/client';

export class UserDto implements User{
    @Exclude()
    password:string;

    id: number;
    name: string;
    surename: string;
    email: string;
    createdAt: Date;
    number: number;
}