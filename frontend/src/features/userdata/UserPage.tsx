import {Box, Button, Grid, Image, List, Loader, NumberInput, Paper, ScrollArea, Text, Textarea} from "@mantine/core";
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
                response[i].createdAt = new Date(response[i].createdAt.toLocaleString());
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
            <Paper ml="10%" mr="10%" radius="xl" p="lg" h="100%">
                <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
                <Box >
                    <Text fw={700} fz="xl" mb="lg" style={{textAlign:"center"}}>
                        Profil użytkownika
                    </Text>
                    <Grid gutter="lg" align="stretch">
                        <Grid.Col span={{ base: 12, md: 4 }} style={{ textAlign: 'center' }}>
                            <Image
                                radius="xl"
                                width={250}
                                height={250}
                                src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                                mx="auto"
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <List spacing="sm" pl="md">
                                <Text mb="md" fw={700}>Konto utworzono: {formattedDate}</Text>
                                <Text mb="md">Imię: {user.name}</Text>
                                <Text mb="md">Nazwisko: {user.surename}</Text>
                                <Text mb="md">Numer: {user.number}</Text>
                                <Text>Email: {user.email}</Text>
                            </List>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <Text fw={700} mb="xs">Ocena:</Text>
                            <Box display="flex">{renderStars(Number(rating))}</Box>
                        </Grid.Col>
                    </Grid>
                </Box>

                <Box mt="xl">
                    <Text fw={700} mb="sm">Dodaj komentarz:</Text>
                    <Paper p="md" radius="md" shadow="xs">
                        <form onSubmit={form.onSubmit(handleSubmit)}>
                            <Grid gutter="md">
                                <Grid.Col span={{ base: 12, md: 8 }}>
                                    <Text mb="xs">Treść komentarza:</Text>
                                    <Textarea
                                        name="text"
                                        minRows={3}
                                        required
                                        autosize
                                        placeholder="treść komentarza"
                                        {...form.getInputProps('text')}
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 4 }}>
                                    <Text mb="xs">Ocena (1-5):</Text>
                                    <NumberInput
                                        min={1}
                                        max={5}
                                        defaultValue={1}
                                        {...form.getInputProps('rating')}
                                    />
                                    <Button
                                        mt="md"
                                        radius="md"
                                        bg="dark"
                                        fullWidth
                                        type="submit"
                                        className="buttonCover"
                                    >
                                        Dodaj komentarz
                                    </Button>
                                </Grid.Col>
                            </Grid>
                        </form>
                    </Paper>
                </Box>

                <Box mt="xl">
                    <Text fw={700} mb="sm">Opinie o użytkowniku:</Text>
                    <ScrollArea h="30vh">
                        {comments.length > 0 ? (
                            <List spacing="sm" p="lg">
                                {comments.map((comment) => (
                                    <Paper key={comment.id} p="md" shadow="md" radius="md" mb="md">
                                        <Text fw={600}>{comment.createdAt.toLocaleString()}</Text>
                                        <Box display="flex" style={{ alignItems: "center" }} mt="xs">
                                            {renderStars(comment.rating)}
                                            <Text ml="md">{comment.rating}/5</Text>
                                        </Box>
                                        <Text mt="xs">{comment.text}</Text>
                                    </Paper>
                                ))}
                            </List>
                        ) : (
                            <Text>Brak opinii o tym użytkowniku.</Text>
                        )}
                    </ScrollArea>
                </Box>
            </Paper>
        </>
    );

}