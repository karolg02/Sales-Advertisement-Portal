import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import {SimpleGrid,Text } from "@mantine/core";
import {MyOffersList} from "./MyOffersList.tsx";
import {ListMyOffers} from "./api/listMyOffers.ts";

export const MyOffers = () =>{
    const [data, setData] = useState<OfferType[]>([]);

    useEffect(() => {
        ListMyOffers().then((response) => setData(response));
    })

    return (
        <div style={{width: '100%'}}>
            {data.length === 0 ? (
                <Text style={{textAlign:"center", display:''}} size="lg" color="black">
                    Nie masz jeszcze żadnej oferty!
                </Text>
            ) : (
                <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                    {data.map((item) => <MyOffersList key={item.id} item={item}/>)}
                </SimpleGrid>
            )}
        </div>
    )
}