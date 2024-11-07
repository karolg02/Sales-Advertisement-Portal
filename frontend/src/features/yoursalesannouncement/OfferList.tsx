import {ScrollArea, SimpleGrid} from "@mantine/core";
import {OfferListItem} from "./OfferListItem.tsx";
import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import { useAtom } from 'jotai';
import { listOffer } from './api/offer.ts';
import {categoryAtom, lowerPriceAtom, searchAtom, upperPriceAtom} from "../../components/store.ts";

export const OfferList = () => {
    const [data, setData] = useState<OfferType[]>([]);
    const [search] = useAtom(searchAtom);
    const [selectedCategory] = useAtom(categoryAtom);
    const [lowerPrice] = useAtom(lowerPriceAtom);
    const [upperPrice] = useAtom(upperPriceAtom);

    useEffect(() => {
        listOffer().then((response) => setData(response));
    },[search, selectedCategory, lowerPrice, upperPrice]);

    const filteredData = data.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        const matchesLowerPrice = lowerPrice !== null ? item.price >= lowerPrice : true;
        const matchesUpperPrice = upperPrice !== null ? item.price <= upperPrice : true;

        return matchesSearch && matchesCategory && matchesLowerPrice && matchesUpperPrice;
    });

    return (
        <div>
            <ScrollArea h="92vh">
                <SimpleGrid p="lg" ml="xl" mr="xl" cols={{base:1,sm:2,lg:3}}>
                    {filteredData.map((item) => (
                        <OfferListItem key={item.id} item={item} />
                    ))}
                </SimpleGrid>
            </ScrollArea>
        </div>
    );
};