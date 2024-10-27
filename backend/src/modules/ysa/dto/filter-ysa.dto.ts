import {IsEnum, IsOptional} from "class-validator";
import {Transform} from "class-transformer";

export class FilterYsaDto{
    @IsOptional()
    @IsEnum(['title', 'price', 'createdAt','category'])
    sortBy?:string = 'createdAt';
    @IsOptional()
    @IsEnum(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = "desc";
}