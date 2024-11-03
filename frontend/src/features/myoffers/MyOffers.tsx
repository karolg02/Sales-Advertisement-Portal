import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import {SimpleGrid,Text } from "@mantine/core";
import {MyOffersList} from "./MyOffersList.tsx";
import {ListMyOffers} from "./api/listMyOffers.ts";
import {Notifications} from "@mantine/notifications";

export const MyOffers = () =>{
    const [data, setData] = useState<OfferType[]>([]);

    useEffect(() => {
        ListMyOffers().then((response) => setData(response));
    })

    return (
        <div style={{width: '100%'}}>
            <Notifications style={{ position: 'fixed', bottom: 0, right: 0 }} />
            {data.length === 0 ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
                    <Text size="lg">
                        Nie masz jeszcze żadnej oferty!
                    </Text>
                </div>

            ) : (
                <SimpleGrid p="lg" ml="xl" mr="xl" cols={{base: 1, sm: 2, lg: 3}}>
                    {data.map((item) => <MyOffersList key={item.id} item={item}/>)}
                </SimpleGrid>
            )}
        </div>
    )
}