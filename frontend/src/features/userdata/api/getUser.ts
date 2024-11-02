import {API_URL} from "../../../config.ts";

export const getUserData = async (userId: number) => {
    const response = await fetch(`${API_URL}/user/get/${userId}`,{
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