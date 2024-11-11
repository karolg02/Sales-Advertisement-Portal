import {API_URL} from "../config.ts";

export const getMe = async () => {
    const response = await fetch(`${API_URL}/user/me`,{
        method: 'GET',
        credentials: 'include',
    });
    return response.json();
}