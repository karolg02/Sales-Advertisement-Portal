import {API_URL} from "../../../config.ts";

export const getPhotos = async (id: number) => {
    const response = await fetch(`${API_URL}/ysa/photos/${id}`, {
        method: 'GET',
        credentials: 'include',
    });
    return await response.json();
};