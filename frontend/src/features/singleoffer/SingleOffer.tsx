import { OfferType } from "../../types/OfferType.ts";
import { useEffect, useState } from "react";
import { getOffer } from "./api/getOffer.ts";
import { useParams } from "react-router-dom";
import { Button, Divider, Group, Image, List, Loader, NumberInput, Paper, SimpleGrid, Text, ActionIcon } from "@mantine/core";
import { Userdata } from "../userdata/userdata.ts";
import { getUserData } from "../userdata/api/getUser.ts";
import { Notifications } from "@mantine/notifications";
import { useAddToCartForm } from "./hooks/useAddToCartForm.ts";
import { AddCartType } from "../../types/AddCartType.ts";
import { addToCart } from "./api/add-cart.ts";
import { getPhotos } from "./api/getPhotos.ts";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export const SingleOffer = () => {
    const [data, setData] = useState<OfferType | null>(null);
    const [userdata, setUserData] = useState<Userdata | null>(null);
    const { id } = useParams<{ id: string }>();
    const [formattedDate, setFormattedDate] = useState<string>("");
    const form = useAddToCartForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offerResponse = await getOffer(Number(id));
                setData(offerResponse);
                setFormattedDate(new Date(offerResponse.createdAt).toLocaleString());

                const userResponse = await getUserData(offerResponse.userId);
                setUserData(userResponse);

                const imageResponse = await getPhotos(Number(id));
                const urls = imageResponse.map((item: { url: string }) => item.url);

                if (offerResponse.image && !urls.includes(offerResponse.image)) {
                    urls.unshift(offerResponse.image);
                } else if (offerResponse.image && urls[0] !== offerResponse.image) {
                    urls.unshift(urls.splice(urls.indexOf(offerResponse.image), 1)[0]);
                }

                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (vals: AddCartType) => {
        try {
            await addToCart(data?.id, vals);
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
        );
    };

    if (!data || !userdata) {
        return <Loader />;
    }

    return (
        <Paper radius="lg" shadow="xl" p="lg" mt="lg" style={{ maxWidth: '65%', margin: 'auto' }}>
            <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <div style={{ position: 'relative' }}>
                    {imageUrls.length > 1 && (
                        <>
                            <ActionIcon
                                variant="transparent"
                                size="xl"
                                c="black"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    zIndex: 1,
                                }}
                                onClick={goToPreviousImage}
                            >
                                <IconChevronLeft />
                            </ActionIcon>
                            <ActionIcon
                                variant="transparent"
                                c="black"
                                size="xl"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 0,
                                    zIndex: 1,
                                }}
                                onClick={goToNextImage}
                            >
                                <IconChevronRight />
                            </ActionIcon>
                        </>
                    )}
                    <Image
                        src={imageUrls[currentImageIndex]}
                        mih="60vh"
                        h="60vh"
                        fit="contain"
                        style={{ borderRadius: '10px' }}
                    />
                </div>

                <Paper shadow="lg" p="lg">
                    <Group justify="space-between" mt="lg">
                        <Text size="xl" fw={700}>{data.title}</Text>
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
                                Nr. tel: +48 {userdata.number}
                            </Text>
                        </Group>
                    </List>
                    <Divider my="xl" />

                    <Text size="xl" c="green" fw="550" mt="lg" mb="lg">Cena: {data.price} PLN</Text>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Group justify="center" mb="lg">
                            <Text>Liczba sztuk</Text>
                            <NumberInput
                                allowNegative={false}
                                defaultValue={1}
                                min={1}
                                max={data.amount}
                                {...form.getInputProps('amount')}
                            />
                            <Text>z {data.amount} dostępnych</Text>
                        </Group>
                        <Group>
                            <Button fullWidth bg="dark" className="buttonCover" type="submit">
                                Dodaj do koszyka
                            </Button>
                            <Button variant="outline" color="dark" fullWidth>
                                Kup teraz
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </SimpleGrid>

            <Paper p="xl" style={{ marginTop: '20px', borderRadius: '20px' }}>
                <Text size="lg" fw={600} style={{ marginBottom: '10px' }}>Opis produktu</Text>
                <Text size="md" c="gray">{data.description}</Text>
            </Paper>
        </Paper>
    );
};
