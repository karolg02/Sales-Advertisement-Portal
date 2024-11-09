import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

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
        if(response.ok){
            Notifications.show({color: "green", title: "Sukces!", message: "Pomyślnie dodano oferte!",autoClose: 2000, });
        }else{
            Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać oferty!",autoClose: 2000, });
        }
        return response.json();
    }
    catch (error) {
        Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać oferty! :(",autoClose: 2000, });
        return null;
    }
};