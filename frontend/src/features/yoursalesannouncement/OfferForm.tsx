import {useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Grid,
    Group,
    Image,
    NumberInput,
    Paper,
    rem,
    SimpleGrid,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {useOfferForm} from "./hooks/useOfferForm.ts";
import {Notifications} from "@mantine/notifications";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {IconCategory, IconMapPin, IconPhoto, IconRosetteDiscountCheck, IconUpload, IconX} from '@tabler/icons-react';
import {uploadToAzure} from "./azureUploader.ts";
import {categories} from "./categories.ts";
import {OfferTypeValues} from "../../types/OfferTypeValues.ts";
import {createOffer} from "./api/create-offer.ts";

export const OfferForm = () => {
    const form = useOfferForm();
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleDrop = async (files: File[]) => {
        const newUploadedUrls: string[] = [];
        for (const file of files) {
            const url = await uploadToAzure(file);
            if (url) {
                newUploadedUrls.push(url);
                console.log("Uploaded:", url, selectedCategory);
            }
        }
        setUploadedUrls((prevUrls) => [...prevUrls, ...newUploadedUrls]);

        if (newUploadedUrls.length > 0) {
            form.setFieldValue("image", newUploadedUrls[0]);
        }
    };

    const handleSubmit = async (vals: OfferTypeValues) => {
        try{
            await createOffer(vals);
            Notifications.show({color: "green", title: "Sukces!", message: "Pomyślnie dodano oferte!",autoClose: 2000, });
        }
        catch (error) {
            Notifications.show({color: "green", title: "Niepowodzenie!", message: "Nie udało się dodać oferty! :(",autoClose: 2000, });
            console.error(error);
        }
    }

    return (
        <div>
            <Paper shadow="xs" p="xl" style={{ position: 'relative'}}>
                <Notifications style={{ position: 'fixed', bottom: 0, right: 0 }} />
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <SimpleGrid ml="xl" mr="xl" cols={{base: 1, sm: 2, lg: 3}}>

                            <div>
                                <Group display='grid' justify="center" mt="md" mb="xs">

                                    <Group justify="center" mt="md" mb="xs">
                                        <Text fw="bold" size="lg">Wypełnij formularz</Text>
                                    </Group>

                                    <TextInput
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
                                                     {...form.getInputProps('price')}
                                        />

                                        <NumberInput mr="lg"
                                                     style={{width: "20%"}}
                                                     withAsterisk
                                                     label="Ilość"
                                                     placeholder=""
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
                                        {uploadedUrls.length > 0 && (
                                            <Image
                                                src={uploadedUrls[0]}
                                                radius="md"
                                                mih="auto"
                                                h="58vh"
                                                fit='fill'
                                            />
                                        )}
                                        {uploadedUrls.length == 0 && (
                                            <Dropzone
                                                h="58vh"
                                                onDrop={handleDrop}
                                                onReject={(files) => console.log('Rejected files', files)}
                                                maxSize={5 * 1024 ** 2}
                                                accept={IMAGE_MIME_TYPE}
                                            >
                                                <Group justify="center" gap="xl" style={{ pointerEvents: 'none', height: '50vh' }}>
                                                    <Dropzone.Accept>
                                                        <IconUpload
                                                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                                            stroke={1.5}
                                                        />
                                                    </Dropzone.Accept>
                                                    <Dropzone.Reject>
                                                        <IconX
                                                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                                            stroke={1.5}
                                                        />
                                                    </Dropzone.Reject>
                                                    <Dropzone.Idle>
                                                        <IconPhoto
                                                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                                            stroke={1.5}
                                                        />
                                                    </Dropzone.Idle>

                                                    <div>
                                                        <Text size="xl" inline>
                                                            Przeciągnij lub kliknij
                                                        </Text>
                                                        <Text size="sm" c="dimmed" inline mt={7}>
                                                            Załącz zdjęcie które ma być widoczne
                                                        </Text>
                                                    </div>
                                                </Group>
                                            </Dropzone>
                                        )}
                                    </Card.Section>


                                    <Group justify="space-between" mt="md" mb="xs">
                                        <Text fw={500}>Tytuł</Text>
                                        <Badge style={{paddingTop: '1.2em', paddingBottom: '1em'}}
                                               color="green"><IconRosetteDiscountCheck/></Badge>
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
                                            variant="gradient"
                                            gradient={{from: 'blue', to: 'green', deg: 270}}
                                            ml="xl"
                                            mr="xl"
                                            type="submit"
                                    >
                                        Złóż oferte
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
                                                    backgroundColor: selectedCategory === category.value ? "lightgrey" : 'white',
                                                }}
                                            >
                                                <Text style={{textAlign: "center"}} size="md">{category.label}</Text>
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
