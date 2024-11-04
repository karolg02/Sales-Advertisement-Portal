import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const editcart = async (ysaId: number, amount: number) => {
    try{
        const response = await fetch(`${API_URL}/cart/${ysaId}`,{
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({amount}),
        });
        const data = await response.json()
        if (data.count!==0) {
            Notifications.show({color: "green", title: "Sukces!", message: "Pomyślnie zaktualizowano ilość!",autoClose: 4000, });
        }else{
            Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się zaktualizować oferty z koszyka!",autoClose: 4000, });
        }
    }catch (error){
        console.error('Error changing:', error);
    }
}