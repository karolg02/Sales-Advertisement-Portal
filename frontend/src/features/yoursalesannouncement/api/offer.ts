import {API_URL} from "../../../config.ts";
import ky from "ky";
import {OfferType} from "../../../types/OfferType.ts";

export const listOffer = async () =>{
    return ky.get(`${API_URL}/ysa`, {credentials: "include"}).json<OfferType[]>();
}