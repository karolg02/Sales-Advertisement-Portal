import {Exclude} from "class-transformer";

export class ItemsDto {
    @Exclude()
    id: number;
    @Exclude()
    userId: number;
    ysaId: number;
    amount: number;
}