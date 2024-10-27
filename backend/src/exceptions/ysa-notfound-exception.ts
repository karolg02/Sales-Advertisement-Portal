import {NotFoundException} from "@nestjs/common";

export class YsaNotfoundException extends NotFoundException {

    constructor() {
        super("Offer not found!");
    }
}