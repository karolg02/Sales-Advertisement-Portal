import {CommentTypeValues} from "../../../types/CommentTypeValues.ts";
import {API_URL} from "../../../config.ts";
import {Notifications} from "@mantine/notifications";

export const postComment = async (vals: CommentTypeValues, id: number) =>{
    try{
        const response = await fetch(`${API_URL}/user/comments/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vals),
        });
        if(response.ok){
            Notifications.show({ color: "green", title: "Sukces!", message: "Pomyślnie dodano komentarz!", autoClose: 3000 });
        }else{
            Notifications.show({ color: "red", title: "Niepowodzenie!", message: "Nie możesz sam sobie dodać komentarza!", autoClose: 3000 });
        }
    } catch (error){
        Notifications.show({ color: "red", title: "Niepowodzenie!", message: "Nie udało się dodać komentarza!", autoClose: 3000 });
    }
}