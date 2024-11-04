import {API_URL} from "../../../config.ts";
import ky from "ky";
import {OfferType} from "../../../types/OfferType.ts";

export const listOffer = async (filter?: { title?: string; category?: string; }) => {
    const query = new URLSearchParams(filter as any).toString();
    return ky.get(`${API_URL}/ysa?${query}`, { credentials: "include" }).json<OfferType[]>();
}