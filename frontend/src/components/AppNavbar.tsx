import {Button, Card, Group, NumberInput, ScrollArea, SimpleGrid, Text, TextInput} from "@mantine/core";
import {categories} from "../features/yoursalesannouncement/categories.ts";
import {IconBuilding, IconMoneybag, IconZoom} from "@tabler/icons-react";
import { useAtom } from 'jotai';
import {categoryAtom, cityAtom, lowerPriceAtom, searchAtom, upperPriceAtom} from "./store.ts";

export const AppNavbar = () => {
    const [search, setSearch] = useAtom(searchAtom);
    const [selectedCategory, setSelectedCategory] = useAtom(categoryAtom);
    const [lowerPrice, setLowerPrice] = useAtom(lowerPriceAtom);
    const [upperPrice, setUpperPrice] = useAtom(upperPriceAtom);
    const [city, setCity] = useAtom(cityAtom);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    }

    const handleClear = () => {
        setSearch("");
        setSelectedCategory(null);
        setLowerPrice(0);
        setUpperPrice(null);
        setCity('');
    }
    return (
        <div style={{display: "list-item"}}>
            <ScrollArea h="85vh">
            <Group justify="center" pt="sm">
                <IconZoom style={{color: "orange", marginTop:"0.5em"}}/>
                <TextInput
                    mt="xs"
                    placeholder="Wyszukaj po nazwie"
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
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
                                    backgroundColor: selectedCategory === category.label ? "orange" : "white",
                                }}
                                onClick={() => handleCategoryClick(category.label)}
                            >
                                <Text style={{textAlign: "center"}} size="xs">{category.label}</Text>
                            </Card>

                        </div>
                    ))}
                </SimpleGrid>
            </div>
            <div  style={{textAlign: "center"}}>
                <IconMoneybag style={{color: "orange"}}/>
            </div>
            <Group justify="center" pt="sm">
                <NumberInput
                    label="Minimalna cena"
                    value={lowerPrice ?? undefined}
                    onChange={(value) => setLowerPrice(value !== "" ? Number(value) : null)}
                    min={0}
                    style={{width:'45%'}}
                />
                <NumberInput
                    label="Maksymalna cena"
                    value={upperPrice ?? undefined}
                    onChange={(value) => setUpperPrice(value !== "" ? Number(value) : null)}
                    min={lowerPrice ?? undefined}
                    style={{width:'45%'}}
                />

                <Group justify="center" >
                    <IconBuilding style={{color: "orange",marginTop:"0.7em"}}/>
                    <TextInput
                        mt="xs"
                        placeholder="Miasto"
                        value={city ?? undefined}
                        onChange={(event) => setCity(event.currentTarget.value)}
                    />
                </Group>

                <Button
                    variant="outline"
                    color="yellow"
                onClick={handleClear}
                >
                    Wyczyść filtry
                </Button>
            </Group>
            </ScrollArea>
        </div>
    )
}