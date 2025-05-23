import {useState} from 'react';
import {
    Badge, Box,
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
import {postPhoto} from "./api/postphoto.ts";

export const OfferForm = () => {
    const form = useOfferForm();
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleDrop = async (files: File[]) => {
        const remainingSlots = 5 - uploadedUrls.length;
        const filesToUpload = files.slice(0, remainingSlots);

        const newUploadedUrls: string[] = [];
        for (const file of filesToUpload) {
            const url = await uploadToAzure(file);
            if (url) {
                newUploadedUrls.push(url);
            }
        }
        setUploadedUrls((prevUrls) => [...prevUrls, ...newUploadedUrls]);

        if (newUploadedUrls.length > 0 && !selectedImage) {
            setSelectedImage(newUploadedUrls[0]);
            form.setFieldValue("image", newUploadedUrls[0]);
        }
    };

    const handleSelectImage = (url: string) => {
        setSelectedImage(url);
        form.setFieldValue("image", url);
    };

    const handleSubmit = async (vals: OfferTypeValues) => {
        try {
            const offer = await createOffer(vals);
            const offerId = offer?.id;

            await Promise.all(
                uploadedUrls.map(async (url) => {
                    await postPhoto(offerId, url);
                })
            );
        } catch (error) {
            console.error("Błąd podczas zapisywania oferty lub zdjęć:", error);
        }
    };

    return (
        <div>
            <Paper h="100%" shadow="lg" radius="lg" p="xl" style={{ position: 'relative'}}>
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

                                    {uploadedUrls.length>0 &&(
                                        <Text>Wybierz zdjęcie na okładkę:</Text>
                                    )}
                                    <Group gap="xs">
                                        {uploadedUrls.map((url, index) => (
                                            <>
                                                <Box
                                                    key={index}
                                                    style={{
                                                        width: 100,
                                                        height: 100,
                                                        border: url === selectedImage ? '2px solid orange' : '1px solid grey',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                    onClick={() => handleSelectImage(url)}
                                                >
                                                    <Image src={url} width={100} height={100} fit="cover" />
                                                </Box>
                                            </>
                                        ))}
                                    </Group>

                                </Group>
                            </div>

                            <div>
                                <Card shadow="sm" padding="lg" radius="lg" withBorder>
                                    <Card.Section>
                                        {uploadedUrls.length > 0 && (
                                            <Image
                                                src={selectedImage}
                                                radius="md"
                                                mih="auto"
                                                h="58vh"
                                                fit='contain'
                                                p="lg"
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
                                                            Załącz zdjęcia, max 5
                                                        </Text>
                                                    </div>
                                                </Group>
                                            </Dropzone>
                                        )}
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
