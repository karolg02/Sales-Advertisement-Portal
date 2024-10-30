import {SimpleGrid} from "@mantine/core";
import {OfferListItem} from "./OfferListItem.tsx";
import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import {listOffer} from "./api/offer.ts";

export const OfferList = () =>{
    const [data, setData] = useState<OfferType[]>([]);

    useEffect(() => {
        listOffer().then((response) => setData(response));
    })

    return (
        <div>
            <SimpleGrid p="lg" ml="xl" mr="xl" cols={{base:1,sm:2,lg:3}}>
                {data.map((item)=><OfferListItem key={item.id} item={item} />)}
            </SimpleGrid>
        </div>
    )
}