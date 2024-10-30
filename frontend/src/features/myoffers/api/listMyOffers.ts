import ky from "ky";
import {API_URL} from "../../../config.ts";
import {OfferType} from "../../../types/OfferType.ts";

export const ListMyOffers = () => {
    return ky.get(`${API_URL}/ysa/me/me`, {credentials: "include"}).json<OfferType[]>();
}