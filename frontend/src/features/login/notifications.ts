import {showNotification} from "@mantine/notifications";

export const loginErrorNotification = () => {
    showNotification({
        color: 'red',
        title: 'Błąd',
        message: 'Nie udało się zalogować!',
        autoClose: 3000
    });
}