import {List, Paper, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {getCart} from "./api/getcart.ts";
import {CartItems} from "./CartItems.tsx";
import {CartType} from "../../types/CartType.ts";

export const Cart = () => {
    const [data, setData] = useState<CartType[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try{
                const response = await getCart();
                setData(response);
            }
            catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
        fetch();
    },[])

    return (
        <div style={{width: '100%'}}>
            {data.length === 0 ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
                    <Text size="lg">
                        Nie masz jeszcze nic w koszyku!
                    </Text>
                </div>

            ) : (
                <Paper shadow="xl" p="lg" radius="lg" style={{ maxWidth: '70%', margin: ' auto' }}>
                    <List p="lg" ml="xl" mr="xl">
                        {data.map((item) => <CartItems key={item.ysaId} item={item}/>)}
                    </List>
                </Paper>
            )}
        </div>
    )
}