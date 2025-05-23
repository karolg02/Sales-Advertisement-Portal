import {OfferTypeValues} from "../../../types/OfferTypeValues.ts";
import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const createOffer = async (data: OfferTypeValues) => {
    try {
        const response = await fetch(`${API_URL}/ysa`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const offer = await response.json();
            Notifications.show({ color: "green", title: "Sukces!", message: "Pomyślnie dodano oferte!", autoClose: 2000 });
            return offer;
        } else {
            Notifications.show({ color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać oferty!", autoClose: 2000 });
        }
        return null;
    } catch (error) {
        Notifications.show({ color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać oferty! :(", autoClose: 2000 });
        return null;
    }
};
