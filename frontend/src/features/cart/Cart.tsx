import {List, Paper, ScrollArea, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {getCart} from "./api/getcart.ts";
import {CartItems} from "./CartItems.tsx";
import {CartType} from "../../types/CartType.ts";
import {Notifications} from "@mantine/notifications";

export const Cart = () => {
    const [data, setData] = useState<CartType[]>([]);

    const fetchCart = async () => {
        try {
            const response = await getCart();
            setData(response);
        } catch (error) {
            console.error("Error fetching offer:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div style={{width: '100%'}}>
            <Notifications style={{ position: 'fixed', top: 60, right: 0 }} />
            {data.length === 0 ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
                    <Text size="lg">
                        Nie masz jeszcze nic w koszyku!
                    </Text>
                </div>

            ) : (
                <Paper shadow="xl" p="lg" radius="lg" mt="lg" style={{ maxWidth: '70%', margin: ' auto' }}>
                    <ScrollArea viewportProps={{style:{maxHeight: '80vh'}}}>
                    <List p="lg" ml="xl" mr="xl">
                        {data.map((item) => <CartItems key={item.ysaId} item={item} refreshCart={fetchCart}/>)}
                    </List>
                    </ScrollArea>
                </Paper>
            )}
        </div>
    )
}