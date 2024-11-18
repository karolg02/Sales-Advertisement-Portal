import {NotFoundException} from "@nestjs/common";

export class YsaNotfoundException extends NotFoundException {

    constructor() {
        super("Offer not found!");
    }
}

export class WrongAmount extends NotFoundException {
    constructor() {
        super("Wrong amount");
    }
}

export class InCart extends NotFoundException {
    constructor() {
        super("Already in cart");
    }
}

export class CantPost extends NotFoundException {
    constructor() {
        super("You can't post an comment on your own profile!");
    }
}