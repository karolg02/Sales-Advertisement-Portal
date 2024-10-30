import { API_URL } from "../../../config.ts";

type NavigateFunction = (path: string, options?: { replace?: boolean }) => void;

export const logout = async (navigate: NavigateFunction) => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            navigate('/login');
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error);
    }
}