import {OfferTypeValues} from "../../../types/OfferTypeValues.ts";
import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const editOffer = async (ysaId: number, vals: OfferTypeValues) =>{
    try{
        const response = await fetch(`${API_URL}/ysa/${ysaId}`,{
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vals),
        });
        if (response.ok) {
            Notifications.show({color: "green", title: "Sukces!", message: "Pomyślnie zaktualizowano ofertę!",autoClose: 4000, });
        }else{
            Notifications.show({color: "red", title: "Niepowodzenie!", message: "Nie udało się zaktualizować oferty!",autoClose: 4000, });
        }
    }catch (error){
        console.error('Error changing:', error);
    }
}