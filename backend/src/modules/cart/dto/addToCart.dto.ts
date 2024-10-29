import {IsNumber} from "class-validator";

export class addCartDto {
    @IsNumber()
    amount: number;
}