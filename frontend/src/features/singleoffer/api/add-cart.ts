import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";
import {AddCartType} from "../../../types/AddCartType.ts";

export const addToCart = async (id: number | undefined, vals: AddCartType) => {
    try {
        const response = await fetch(`${API_URL}/cart/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vals),
        });
        if(response.ok){
            Notifications.show({color: "green", title: "Sukces!", message: "Pomyślnie dodano do koszyka!",autoClose: 2000, });
        }else{
            Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać do koszyka!",autoClose: 2000, });
        }
        return response.ok;

    } catch (error) {
        Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać do koszyka!",autoClose: 2000, });
        return null;
    }
}