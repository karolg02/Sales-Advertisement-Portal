import {useParams} from "react-router-dom";
import {useForm} from "@mantine/form";
import {
    Badge,
    Button,
    Card,
    Grid,
    Group,
    Image,
    NumberInput,
    Paper,
    SimpleGrid,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {IconCategory, IconMapPin, IconRosetteDiscountCheck} from "@tabler/icons-react";
import {categories} from "./categories.ts";
import {useEffect, useState} from "react";
import {getOffer} from "../singleoffer/api/getOffer.ts";
import {OfferType} from "../../types/OfferType.ts";
import {OfferTypeValues} from "../../types/OfferTypeValues.ts";
import {editOffer} from "./api/edit-offer.ts";

export const OfferEdit = () => {
    const [data, setData] = useState<OfferType | null>(null);
    const { id } = useParams<{ id: string }>();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const form = useForm({
        initialValues: {
            title: '',
            description: '',
            price: 0,
            amount: 1,
            city: '',
            image: '',
            category: '',
        },
    });

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const response = await getOffer(Number(id));
                setData(response);
                form.setValues({
                    title: response.title,
                    description: response.description,
                    price: (Number(response.price)),
                    amount: response.amount,
                    city: response.city,
                    image: response.image,
                    category: response.category,
                });
                setSelectedCategory(response.category);
                setIsDataLoaded(true);
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
        fetchGet();
    }, [id,isDataLoaded]);

    const handleSubmit = async (vals: OfferTypeValues) => {
        try{
            await editOffer(Number(data?.id),vals);
            console.log(vals);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Paper shadow="xs" p="xl" style={{ position: 'relative'}}>
                <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <SimpleGrid ml="xl" mr="xl" cols={{base: 1, sm: 2, lg: 3}}>

                        <div>
                            <Group display='grid' justify="center" mt="md" mb="xs">

                                <Group justify="center" mt="md" mb="xs">
                                    <Text fw="bold" size="lg">Wypełnij formularz</Text>
                                </Group>

                                <Textarea
                                    autosize
                                    withAsterisk
                                    label="Tytuł"
                                    placeholder="tytuł"
                                    {...form.getInputProps('title')}
                                />
                                <Textarea
                                    pt="xl"
                                    autosize
                                    minRows={5}
                                    withAsterisk
                                    label="Opis"
                                    placeholder="opis"
                                    {...form.getInputProps('description')}
                                />

                                <Grid pt="xl" ml='xs' mb="lg">

                                    <NumberInput mr="lg"
                                                 style={{width: "20%"}}
                                                 withAsterisk
                                                 label="Cena"
                                                 placeholder="zł"
                                                 allowNegative={false}
                                                 min={1}
                                                 {...form.getInputProps('price')}
                                    />

                                    <NumberInput mr="lg"
                                                 style={{width: "20%"}}
                                                 withAsterisk
                                                 label="Ilość"
                                                 placeholder=""
                                                 allowNegative={false}
                                                 defaultValue="1"
                                                 min={1}
                                                 {...form.getInputProps('amount')}
                                    />

                                    <TextInput mr="lg"
                                               style={{width: "40%"}}
                                               withAsterisk
                                               label="Miasto"
                                               placeholder="miasto"
                                               {...form.getInputProps('city')}
                                    />
                                </Grid>

                            </Group>
                        </div>

                        <div>
                            <Card shadow="sm" padding="lg" radius="lg" withBorder>
                                <Card.Section>
                                    <Image
                                        src={data?.image}
                                        radius="md"
                                        mih="auto"
                                        h="58vh"
                                        fit='contain'
                                        p="lg"
                                    />
                                </Card.Section>


                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={500}>Tytuł</Text>
                                    <Badge style={{paddingTop: '1.2em', paddingBottom: '1em'}}
                                           variant="transparent"
                                           color="yellow"><IconRosetteDiscountCheck/></Badge>
                                </Group>

                                <Text size="sm" c="dimmed" mih="4em" mah="4em" lineClamp={2}>
                                    Opis
                                </Text>

                                <Group justify="space-between" gap="xl">
                                    <Text style={{display: 'flex', alignItems: 'center', textAlign: "left"}}>
                                        <IconMapPin style={{marginRight: 4}}/>Miejscowość:
                                    </Text>
                                    <Text style={{display: 'flex', alignItems: 'center', textAlign: "right"}}>
                                        <IconCategory style={{marginRight: 4}}/>Kategoria
                                    </Text>
                                </Group>
                                <Group justify="space-between" gap="xl">
                                    <Text style={{textAlign: "left"}}>
                                        Miasto
                                    </Text>
                                    <Text style={{textAlign: "right"}}>
                                        {selectedCategory}
                                    </Text>
                                </Group>


                                <Group>
                                    Cena
                                </Group>

                                <Button mt="md" radius="md"
                                        bg="dark"
                                        ml="xl"
                                        mr="xl"
                                        type="submit"
                                        className="buttonCover"
                                >
                                    Zmień oferte
                                </Button>
                            </Card>
                        </div>

                        <div>
                            <Group justify="center" mt="md" mb="xs">
                                <Text fw="bold" size="lg">Wybierz kategorię</Text>
                            </Group>

                            <SimpleGrid pt="lg" pb="lg" cols={2}>
                                {categories.map((category) => (
                                    <div key={category.value}>
                                        <Card
                                            {...form.getInputProps('category')}
                                            shadow="sm"
                                            padding="lg"
                                            onClick={() => {
                                                setSelectedCategory(category.value);
                                                form.setFieldValue('category', category.value);
                                            }}
                                            style={{
                                                cursor: 'pointer',
                                                border: "1px solid grey",
                                                color: selectedCategory === category.value ? "orange" : 'grey',
                                            }}
                                        >
                                            <Text style={{textAlign: "center"}} size="md"
                                                  fw={selectedCategory === category.value ? "bold" :""}
                                            >{category.label}</Text>
                                        </Card>

                                    </div>

                                ))}
                            </SimpleGrid>
                        </div>

                    </SimpleGrid>
                </form>
            </Paper>
        </div>
    );
}