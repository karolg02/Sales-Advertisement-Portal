import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

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

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    lowerPrice?: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    upperPrice?: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    page?: number;
}
