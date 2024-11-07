import {API_URL} from "../../../config.ts";
import ky from "ky";
import {OfferType} from "../../../types/OfferType.ts";

export const listOffer = async (filter?: { title?: string; category?: string; }, page: number = 1) => {
    const query = new URLSearchParams({
        ...filter,
        page: page.toString(),
    }).toString();
    return ky.get(`${API_URL}/ysa?${query}`, { credentials: "include" }).json<OfferType[]>();
};