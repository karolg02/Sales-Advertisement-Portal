import {Box, Button, Image, List, Loader, NumberInput, Paper, ScrollArea, Text, Textarea} from "@mantine/core";
import {useAtom} from "jotai";
import {userData} from "../../components/store.ts";
import {useEffect, useState} from "react";
import {IconStar, IconStarFilled, IconStarHalfFilled} from "@tabler/icons-react";
import {CommentType} from "../../types/CommentType.ts";
import {getComments} from "../cart/api/getComments.ts";
import {useCommentForm} from "./hooks/useCommentForm.ts";
import {CommentTypeValues} from "../../types/CommentTypeValues.ts";
import {postComment} from "./api/postComment.ts";
import {Notifications} from "@mantine/notifications";

export const UserPage = () => {
    const form = useCommentForm();
    const [user] = useAtom(userData);
    const [formattedDate, setFormattedDate] = useState<string>("");
    const [comments, setComments] = useState<CommentType[]>([]);
    const [rating, setRating] = useState<Number>(0);

    const fetchComments = async () => {
        try{
            const response = await getComments(user?.id);
            response.reverse();
            setComments(response);
            let x = 0;
            for(let i = 0; i < response.length; i++){
                x += Number(response[i].rating);
            }
            if(response.length > 0){
                setRating(x/response.length);
            }
        }catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(user){
            setFormattedDate(new Date(user.createdAt).toLocaleString());
        }
        fetchComments().then();
    },[user])

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IconStarFilled key={`full-${i}`} size={24} color="#ffb800" />);
        }

        if (halfStars) {
            stars.push(<IconStarHalfFilled key="half" size={24} color="#ffb800" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<IconStar key={`empty-${i}`} size={24} color="#ffb800" />);
        }

        return stars;
    };

    const handleSubmit = async (vals: CommentTypeValues) => {
        try{
            if(user?.id){
                await postComment(vals, user.id);
            }
            fetchComments();
        } catch (error){
            console.log(error);
        }
    };

    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <Paper ml="15%" mr="15%" radius="xl">
                <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
                <Box display="flex" p="lg" style={{ flexDirection: 'row' }}>
                    <Image
                        radius="xl"
                        width={350}
                        height={350}
                        src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                    />
                    <Box mt="lg" ml="10%" style={{ flexGrow: 1 }}>
                        <List spacing="sm" pl="md">
                            <Text mb="xl" fw={700}>Profil użytkownika</Text>
                            <Text mb="md">Konto utworzono: {formattedDate}</Text>
                            <Text mb="md">Imię: {user.name}</Text>
                            <Text mb="md">Nazwisko: {user.surename}</Text>
                            <Text mb="md">Numer: {user.number}</Text>
                            <Text>Email: {user.email}</Text>
                        </List>
                    </Box>
                    <Box>
                        <Text fw={700} mt="lg" mb="xs">Ocena:</Text>
                        <Box display="flex">{renderStars(Number(rating))}</Box>
                    </Box>
                </Box>
                <Box ml="xl" p="lg">
                    <Box>
                        <Text fw={700} mb="sm">Dodaj komentarz:</Text>
                        <Paper p="md" radius="md" shadow="xs">
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Box display="flex" style={{ alignItems: "flex-start" }} mb="sm">
                                    <Box flex="1" mr="sm">
                                        <Text mb="xs">Treść komentarza:</Text>
                                        <Textarea
                                            name="text"
                                            minRows={3}
                                            required
                                            autosize
                                            placeholder="treść komentarza"
                                            {...form.getInputProps('text')}
                                        />
                                    </Box>
                                    <Box>
                                        <Text mb="xs">Ocena (1-5):</Text>
                                        <NumberInput
                                            min={1}
                                            max={5}
                                            defaultValue={1}
                                            {...form.getInputProps('rating')}
                                        />
                                        <Button mt="md" radius="md"
                                                bg="dark"
                                                ml="xl"
                                                mr="xl"
                                                type="submit"
                                                className="buttonCover"
                                        >
                                            Dodaj komentarz
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        </Paper>
                    </Box>

                    <Text fw={700} mt="lg" mb="sm">Opinie o użytkowniku:</Text>
                    <ScrollArea>
                        {comments.length > 0 ? (
                            <ScrollArea h="35vh">
                                <List spacing="sm" p="lg" ml="xl" mr="xl">
                                    {comments.map((comment) => (
                                        <Paper key={comment.id} p="md" shadow="md" radius="md" mb="md">
                                            <Text fw={600}>{comment.userId}</Text>
                                            <Box display="flex" style={{ alignItems: "center" }} mt="xs">
                                                {renderStars(comment.rating)}
                                                <Text ml="md">{comment.rating}/5</Text>
                                            </Box>
                                            <Text mt="xs">{comment.text}</Text>
                                        </Paper>
                                    ))}
                                </List>
                            </ScrollArea>
                        ) : (
                            <Text>Brak opinii o tym użytkowniku.</Text>
                        )}
                    </ScrollArea>
                </Box>
            </Paper>
        </>
    )
}