import {OfferTypeValues} from "../../../types/OfferTypeValues.ts";
import {API_URL} from "../../../config.ts";

export const createOffer = async (data: OfferTypeValues) => {
    try {
        const response = await fetch(`${API_URL}/ysa`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;

    } catch (error) {
        console.error('Error editing:', error);
        return null;
    }
}