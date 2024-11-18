import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
    @IsString()
    text: string;
    @IsNumber()
    rating: number;
}