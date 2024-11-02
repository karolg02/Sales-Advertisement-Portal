import ky from "ky";
import {API_URL} from "../../../config.ts";
import {CartType} from "../../../types/CartType.ts";

export const getCart = () => {
    return ky.get(`${API_URL}/cart`, {credentials: "include"}).json<CartType[]>();
}