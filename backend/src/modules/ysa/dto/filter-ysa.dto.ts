import {IsEnum, IsOptional, IsString} from "class-validator";

export class FilterYsaDto {
    @IsOptional()
    @IsEnum(['title', 'price', 'createdAt', 'category'])
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsEnum(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = "desc";

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    title?: string;
}
