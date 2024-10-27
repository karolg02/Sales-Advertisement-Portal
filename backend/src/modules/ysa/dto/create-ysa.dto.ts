import {IsInt, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateYsaDto{
    @IsString()
    @IsNotEmpty()
    title:string;
    @IsString()
    @IsNotEmpty()
    description:string;
    @IsString()
    @IsNotEmpty()
    image:string;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsInt()
    @IsNotEmpty()
    amount: number;
    @IsString()
    @IsNotEmpty()
    category: string;
}