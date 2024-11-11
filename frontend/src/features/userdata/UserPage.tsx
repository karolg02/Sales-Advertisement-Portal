import {Box, Image, List, Loader, Paper, ScrollArea, Text} from "@mantine/core";
import {useAtom} from "jotai";
import {userData} from "../../components/store.ts";
import {useEffect, useState} from "react";
import {IconStar, IconStarFilled, IconStarHalfFilled} from "@tabler/icons-react";

export const UserPage = () => {
    const [user] = useAtom(userData);
    const [formattedDate, setFormattedDate] = useState<string>("");
    useEffect(() => {
        if(user){
            setFormattedDate(new Date(user.createdAt).toLocaleString());
        }
    },[])

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

    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <Paper mt="5%" ml="20%" mr="20%" radius="xl">
                <ScrollArea h="70vh">
                    <Box display="flex" p="lg">
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
                            <Box display="flex">{renderStars(5)}</Box>
                        </Box>
                    </Box>
                    <Box ml="xl" p="lg">
                        <Text fw={700} mb="sm">Opinie o użytkowniku:</Text>
                        <Text>10/10 zajebisty ziomek</Text>
                    </Box>
                </ScrollArea>
            </Paper>
        </>
    )
}