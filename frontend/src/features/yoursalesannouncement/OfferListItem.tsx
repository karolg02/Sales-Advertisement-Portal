import {Badge, Button, Card, Group, Image, Text} from '@mantine/core';
import {OfferType} from "../../types/OfferType.ts";
import {IconCategory, IconMapPin, IconRosetteDiscountCheck} from "@tabler/icons-react";

interface OfferListItemProps{
    item: OfferType;
}

export const OfferListItem = ({item}: OfferListItemProps) => {
    return (
        <Card shadow="sm" padding="lg" radius="lg" withBorder>
            <Card.Section>
                <Image
                    src={item.image}
                    radius="md"
                    mih="auto"
                    h="60vh"
                    fit='fill'
                />
            </Card.Section>


            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{item.title}</Text>
                <Badge style={{paddingTop: '1.2em', paddingBottom: '1em'}}
                       color="green"><IconRosetteDiscountCheck/></Badge>
            </Group>

            <Text size="sm" c="dimmed" mih="4em" mah="4em" lineClamp={2}>
                {item.description}
            </Text>

            <Group justify="space-between" gap="xl">
                <Text style={{ display: 'flex', alignItems: 'center', textAlign: "left"}}>
                    <IconMapPin style={{ marginRight: 4 }}/>Miejscowość:
                </Text>
                <Text style={{ display: 'flex', alignItems: 'center', textAlign: "right"}}>
                    <IconCategory style={{ marginRight: 4 }}/>Kategoria
                </Text>
            </Group>
            <Group justify="space-between" gap="xl">
                <Text style={{ textAlign: "left"}}>
                    {item.city}
                </Text>
                <Text style={{ textAlign: "right" }}>
                    {item.category}
                </Text>
            </Group>


            <Group>
                Cena: {item.price} zł
            </Group>

            <Button mt="md" radius="md"
                    variant="gradient"
                    gradient={{from: 'blue', to: 'green', deg: 270}}
                    ml="xl"
                    mr="xl"
            >
                Przejdz do oferty
            </Button>
        </Card>
    );
}