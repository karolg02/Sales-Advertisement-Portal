import {API_URL} from "../../../config.ts";

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa(username + ":" + password),
        },
        credentials: 'include',
    });
    if(response.status !== 200)throw new Error("Login failed");
    return await response.text();
}