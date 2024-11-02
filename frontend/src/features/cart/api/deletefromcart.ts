import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const deleteFromCart =async (ysaId: number) => {
    try{
        const response = await fetch(`${API_URL}/cart/${ysaId}`,{
            method: "DELETE",
            credentials: "include",
        })
        if (!response.ok) {
            Notifications.show({color: "green", title: "Sukces!", message: "Pomyślnie usunięto z koszyka!",autoClose: 2000, });
        }else{
            Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się usunąć oferty z koszyka!",autoClose: 2000, });
        }
    }catch (error){
        console.error('Error deleting:', error);
    }
}