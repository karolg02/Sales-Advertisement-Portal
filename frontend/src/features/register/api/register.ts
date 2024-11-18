import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const Register = async (name: string, surename: string, email: string, password: string, number: number) => {
    const response = await fetch(`${API_URL}/user`,{
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa(email + ":" + password),
        },
        body: JSON.stringify({ name,surename, email, password, number }),
    });
    if(response.ok){
        Notifications.show({color:"green", title: "Sukces!", message: "Rejestracja przebiegła pomyślnie!",autoClose: 3000, });
    } else {
    let errorMessage = "Nie udało się utworzyć użytkownika!";
    try {
        const errorData = await response.json();
        if (errorData.message) {
            errorMessage =
                Array.isArray(errorData.message) && errorData.message.length > 0
                    ? errorData.message[0]
                    : errorData.message;
        }
    } catch (e) {
        console.error("Nie udało się sparsować odpowiedzi błędu:", e);
    }

    Notifications.show({
        color: "red",
        title: "Niepowodzenie!",
        message: errorMessage,
        autoClose: 3000,
    });
}
}