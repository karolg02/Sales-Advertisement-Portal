import {IsNotEmpty, IsString} from "class-validator";

export class postPhoto {
    @IsString()
    @IsNotEmpty()
    url:string;
}