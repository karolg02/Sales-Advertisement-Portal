import {useState} from 'react';
import {Button, Card, Grid, Group, NumberInput, Paper, rem, Stack, Text, Textarea, TextInput,Image} from "@mantine/core";
import {useOfferForm} from "./hooks/useOfferForm.ts";
import {Notifications} from "@mantine/notifications";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from '@tabler/icons-react';
import {uploadToAzure} from "./azureUploader.ts";
import {categories} from "./categories.ts";

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
                console.log("Uploaded:", url);
            }
        }
        setUploadedUrls((prevUrls) => [...prevUrls, ...newUploadedUrls]);
        console.log("All uploaded image URLs:", newUploadedUrls);
    };

    const handleSubmit = async () => {
        // logikę do przesyłania formularza
        console.log("Submitted image URLs:", uploadedUrls);
    }

    return (
        <div>
            <Paper shadow="xs" p="xl" style={{ position: 'relative' }}>
                <Notifications style={{ position: 'fixed', bottom: 0, right: 0 }} />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap={"lg"}>
                        <TextInput
                            withAsterisk
                            label="Title"
                            placeholder="Title"
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            withAsterisk
                            label="Description"
                            placeholder="Description"
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
                                                shadow="sm"
                                                padding="lg"
                                                onClick={() => setSelectedCategory(category.value)}
                                                style={{
                                                    cursor: 'pointer',
                                                    border: selectedCategory === category.value ? '1px solid blue' : 'none'
                                                }}
                                            >
                                                <Text style={{textAlign:"center"}} size="md">{category.label}</Text>
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
                            label="price"
                            placeholder="zł"
                            {...form.getInputProps('price')}
                        />

                        <NumberInput mr="lg"
                            style={{width: "20%"}}
                            withAsterisk
                            label="amount"
                            placeholder=" "
                            {...form.getInputProps('amount')}
                        />

                        <TextInput mr="lg"
                            style={{width: "40%"}}
                            withAsterisk
                            label="city"
                            placeholder="city"
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
                                        Drag image here or click to select file
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        Attach one photo
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
                                    type="submit">Add an offer
                            </Button>
                        </div>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
}
