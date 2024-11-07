import {Button, Card, Group, Image, Text} from '@mantine/core';
import {OfferType} from "../../types/OfferType.ts";
import {IconCategory, IconMapPin} from "@tabler/icons-react";
import {deleteOffer} from "../yoursalesannouncement/api/deleteOffer.ts";
import {useNavigate} from "react-router-dom";

interface OfferListItemProps {
    item: OfferType;
}

export const MyOffersList = ({ item }: OfferListItemProps) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        setTimeout(async () => {
            await deleteOffer(item.id);
        }, 100);
    };

    return (
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Card.Section>
                <Image
                    src={item.image}
                    radius="md"
                    mih="auto"
                    h="60vh"
                    fit='contain'
                    p="lg"
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs" >
                <Text fw={500} lineClamp={1}>{item.title}</Text>
            </Group>

            <Text size="sm" c="dimmed" mih="3em" mah="3em" lineClamp={2}>
                {item.description}
            </Text>

            <Group justify="space-between" gap="xl">
                <Text style={{ display: 'flex', alignItems: 'center', textAlign: "left" }}>
                    <IconMapPin style={{ marginRight: 4 }} />Miejscowość:
                </Text>
                <Text style={{ display: 'flex', alignItems: 'center', textAlign: "right" }}>
                    <IconCategory style={{ marginRight: 4 }} />Kategoria
                </Text>
            </Group>
            <Group justify="space-between" gap="xl">
                <Text style={{ textAlign: "left" }}>
                    {item.city}
                </Text>
                <Text style={{ textAlign: "right" }}>
                    {item.category}
                </Text>
            </Group>

            <Group>
                Cena: {item.price} zł
            </Group>
            <Group justify="space-between" gap="xl">
                <Button mt="md" radius="md"
                        variant="gradient"
                        gradient={{from: 'blue', to: 'dark', deg: 60}}
                        style={{ width: '40%' }}
                        onClick={() => navigate(`/edit/${item.id}`)}
                >
                    Edytuj
                </Button>
                <Button onClick={handleDelete}
                    mt="md" radius="md"
                        variant="gradient"
                        gradient={{from: 'red', to: 'dark', deg: 60}}
                        style={{ width: '40%'}}>
                    Usuń
                </Button>
            </Group>
        </Card>
    );
}
