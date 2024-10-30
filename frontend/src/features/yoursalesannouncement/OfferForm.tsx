import {useState} from 'react';
import {
    Button,
    Card,
    Grid,
    Group,
    Image,
    NumberInput,
    Paper,
    rem,
    Stack,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {useOfferForm} from "./hooks/useOfferForm.ts";
import {Notifications} from "@mantine/notifications";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from '@tabler/icons-react';
import {uploadToAzure} from "./azureUploader.ts";
import {categories} from "./categories.ts";
import {OfferTypeValues} from "../../types/OfferTypeValues.ts";
import {createOffer} from "./api/create-offer.ts";

export const OfferForm = () => {
    const form = useOfferForm();
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState(false);

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
            console.log(vals);
            await createOffer(vals);
            console.log("Wyslano! :)")
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Paper shadow="xs" p="xl" style={{ position: 'relative' }}>
                <Notifications style={{ position: 'fixed', bottom: 0, right: 0 }} />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap={"lg"}>
                        <TextInput
                            withAsterisk
                            label="Tytuł"
                            placeholder="tytuł"
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            withAsterisk
                            label="Opis"
                            placeholder="opis"
                            {...form.getInputProps('description')}
                        />

                        <Button onClick={() => setShowCategories((prev) => !prev)} variant="outline">
                            {showCategories ? "Hide Categories" : "Show Categories"}
                        </Button>

                        {showCategories && (
                            <div>
                                <Text size="lg">Choose a category:</Text>
                                <Grid pt="lg" pb="lg">
                                    {categories.map((category) => (
                                        <div key={category.value}>
                                            <Card
                                                {...form.getInputProps('category')}
                                                shadow="sm"
                                                padding="lg"
                                                ml="sm"
                                                onClick={() => {
                                                    setSelectedCategory(category.value);
                                                    form.setFieldValue('category', category.value);
                                                }}
                                                style={{
                                                    width: "200px",
                                                    cursor: 'pointer',
                                                    border: selectedCategory === category.value ? '1px solid blue' : '1px solid'
                                                }}
                                            >
                                                <Text style={{ textAlign: "center" }} size="md">{category.label}</Text>
                                            </Card>

                                        </div>

                                    ))}
                                </Grid>
                            </div>
                        )}
                        <Grid ml='xs' mb="lg">
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
                            placeholder=" "
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

                        <Dropzone
                            style={{ border: "1px solid grey" }}
                            onDrop={handleDrop}
                            onReject={(files) => console.log('Rejected files', files)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                        >
                            <Group justify="center" gap="xl" mih={150} style={{ pointerEvents: 'none' }}>
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

                        {/* Wyświetlanie przesłanych linków */}
                        {uploadedUrls.length > 0 && (
                            <div style={{marginTop: '20px'}}>
                                <Image
                                    h={200}
                                    w="auto"
                                    fit="contain"
                                    src={uploadedUrls[0]}
                                />
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <Button style={{textAlign: "right"}}
                                    variant="gradient"
                                    gradient={{ from: 'blue', to: 'green', deg: 270 }}
                                    type="submit">Dodaj oferte
                            </Button>
                        </div>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
}
