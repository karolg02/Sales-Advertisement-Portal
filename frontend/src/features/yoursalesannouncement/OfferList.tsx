import {Button, SimpleGrid} from "@mantine/core";
import {OfferListItem} from "./OfferListItem.tsx";
import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import {useAtom} from 'jotai';
import {listOffer} from './api/offer.ts';
import {categoryAtom, cityAtom, lowerPriceAtom, searchAtom, upperPriceAtom} from "../../components/store.ts";

export const OfferList = () => {
    const [data, setData] = useState<OfferType[]>([]);
    const [search] = useAtom(searchAtom);
    const [selectedCategory] = useAtom(categoryAtom);
    const [lowerPrice] = useAtom(lowerPriceAtom);
    const [upperPrice] = useAtom(upperPriceAtom);
    const [page, setPage] = useState<number>(1);
    const [city] = useAtom(cityAtom);

    const fetchOffers = (newPage = 1) => {
        const filters: Record<string, any> = {};
        if (search) filters.title = search;
        if (selectedCategory) filters.category = selectedCategory;
        if (lowerPrice != null) filters.lowerPrice = lowerPrice;
        if (upperPrice != null) filters.upperPrice = upperPrice;
        if (city != null) filters.city = city;

        if (newPage === 1) setData([]);

        listOffer(filters, newPage).then((response) => {
            setData(prevData => newPage === 1 ? response : [...prevData, ...response]);
        });
    };

    useEffect(() => {
        setPage(1);
        fetchOffers(1);
    }, [search, selectedCategory, lowerPrice, upperPrice, city]);

    useEffect(() => {
        if (page > 1) fetchOffers(page);
    }, [page]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
                <SimpleGrid p="lg" ml="xl" mr="xl" cols={{ base: 1, sm: 2, lg: 3 }}>
                    {data.map((item) => (
                        <OfferListItem key={item.id} item={item} />
                    ))}
                </SimpleGrid>
                {data.length==30*page && (
                    <Button
                        bg="dark"
                        variant="outline"
                        color="white"
                        onClick={handleLoadMore}
                        fullWidth
                    >
                        Wczytaj więcej pozycji
                    </Button>
                )}
        </div>
    );

};
