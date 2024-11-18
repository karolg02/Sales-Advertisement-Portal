import ky from "ky";
import {API_URL} from "../../../config.ts";
import {CommentType} from "../../../types/CommentType.ts";

export const getComments = (id: number | undefined) => {
    return ky.get(`${API_URL}/user/comments/${id}`, {credentials: "include"}).json<CommentType[]>();
}