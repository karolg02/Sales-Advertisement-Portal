import {API_URL} from "../../../config.ts";

export const postPhoto = async (id: number, url: string) => {
    try{
        const response = await fetch(`${API_URL}/ysa/photos/${id}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url})
        })
        return response.json();
    }
    catch (error) {
        return null;
    }
};