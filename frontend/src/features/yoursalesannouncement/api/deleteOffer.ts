import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const deleteOffer = async (id: number) =>{
    try {
        const response = await fetch(`${API_URL}/ysa/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        const data = await response.json();
        //do poprawy powiadomienia
        if (data.count===0) {
            Notifications.show({color: "red", title: "Niepowodzenie", message: "Niestety nie udało się usunąć oferty!",autoClose: 2000, });
        } else {
            Notifications.show({color: "green", title: "Sukces", message: "Pomyślnie usunięto oferte!",autoClose: 2000, });
        }
    } catch (error) {
        console.error('Error deleting:', error);
    }
};