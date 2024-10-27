import {IsEmail, IsNumber, IsString, MinLength} from 'class-validator';

export class CreateUserDto{

    @IsString()
    name:string;
    @IsString()
    surename:string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    password: string;
    @IsNumber()
    number:number;
}