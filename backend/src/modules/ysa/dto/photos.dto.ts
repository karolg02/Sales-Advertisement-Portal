import {Exclude} from "class-transformer";

export class PhotosDto {
    @Exclude()
    id: number;

    url: string;

    @Exclude()
    ysaId: number;
}