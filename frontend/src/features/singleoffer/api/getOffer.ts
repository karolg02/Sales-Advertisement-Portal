import {API_URL} from "../../../config.ts";

export const getOffer = async (id: number) => {
    const response = await fetch(`${API_URL}/ysa/${id}`, {
        method: 'GET',
        credentials: 'include',
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Couldn\'t fetch todo');
        return null;
    }
}