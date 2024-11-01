import {Card, Group, SimpleGrid, Text, TextInput} from "@mantine/core";
import {categories} from "../features/yoursalesannouncement/categories.ts";
import {IconZoom} from "@tabler/icons-react";

export const AppNavbar = () => {
    return (
        <div style={{display: "list-item"}}>
            <Group  justify="center" pt="sm">
                <IconZoom style={{ color:"orange" }}/>
                <TextInput
                placeholder="Wyszukaj po nazwie"
                />
            </Group>

            <div>
                <SimpleGrid cols={2} pt="lg" pb="lg" pl="sm" pr="sm">
                    {categories.map((category) => (
                        <div>
                            <Card
                                p="xs"
                                radius="md"
                                style={{
                                    cursor: 'pointer',
                                    border: "1px solid grey",
                                }}
                            >
                                <Text style={{textAlign: "center"}} size="xs">{category.label}</Text>
                            </Card>

                        </div>
                    ))}
                </SimpleGrid>
            </div>
            <div>

            </div>
        </div>
    )
}