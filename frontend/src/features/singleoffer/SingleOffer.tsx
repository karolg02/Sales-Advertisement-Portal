import {OfferType} from "../../types/OfferType.ts";
import {useEffect, useState} from "react";
import {getOffer} from "./api/getOffer.ts";
import {useParams} from "react-router-dom";
import {
    Button,
    Divider,
    Group,
    Image,
    List,
    Loader,
    NumberInput,
    Paper,
    SimpleGrid,
    Text
} from "@mantine/core";
import {Userdata} from "../userdata/userdata.ts";
import {getUserData} from "../userdata/api/getUser.ts";

export const SingleOffer = () => {
    const [data, setData] = useState<OfferType | null>(null);
    const [userdata, setUserData] = useState<Userdata | null>(null);
    const { id } = useParams<{ id: string }>();
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await getOffer(Number(id));
                setData(response);
                setFormattedDate(new Date(response.createdAt).toLocaleString());
                const response2 = await getUserData(response.userId);
                setUserData(response2);

            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
        fetchGet();
    }, [id]);

    if (!data || !userdata) {
        return <Loader />;
    }

    return (
        <Paper shadow="xl" p="lg" style={{ maxWidth: '65%', margin: ' auto' }}>
            <SimpleGrid cols={{base:1,sm:2}}>
                <Image

                    src={data.image}
                    mih="60vh"
                    h="60vh"
                    fit="cover"
                    style={{ borderRadius: '10px' }}
                />

                <Paper shadow="lg" p="lg">
                    <Group justify="space-between" mt="lg">
                        <Text size="xl" fw={700} >{data.title}</Text>
                        <Text>Utworzono {formattedDate}</Text>
                    </Group>
                    <Divider my="xl" />

                    <Text size="lg" fw={600}>Informacje o sprzedawcy</Text>
                    <List pt="sm">
                        <Group justify="space-between">
                            <Text>
                                Imię: {userdata.name}
                            </Text>
                            <Text>
                                Email: {userdata.email}
                            </Text>
                        </Group>
                        <Group justify="space-between">
                            <Text>
                                Nazwisko: {userdata.surename}
                            </Text>
                            <Text>
                                Nr. tel:  +48 {userdata.number}
                            </Text>
                        </Group>
                    </List>
                    <Divider my="xl"/>

                    <Text size="xl" c="green" fw="550" mt="lg" mb="lg">Cena: {data.price} PLN</Text>
                    <Group justify="center" mb="lg">
                        <Text>Liczba sztuk</Text>
                        <NumberInput
                            allowNegative={false}
                            defaultValue="1"
                            min={1}
                            max={data.amount}
                        />
                        <Text>z {data.amount} dostępnych</Text>
                    </Group>
                    <Group>
                        <Button fullWidth bg="dark" className="buttonCover">Dodaj do koszyka</Button>
                        <Button variant="outline" color="dark"  fullWidth>Kup teraz</Button>
                    </Group>
                </Paper>
            </SimpleGrid>

            <Paper p="xl" style={{ marginTop: '20px', borderRadius: '20px' }}>
                <Text size="lg" w={600} style={{ marginBottom: '10px' }}>Opis produktu</Text>
                <Text size="md" c="gray">{data.description}</Text>
            </Paper>
        </Paper>
    )
}