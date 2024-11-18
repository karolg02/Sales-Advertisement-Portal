import {Button, Group, List, Paper, Text} from "@mantine/core";
import {useEffect, useState} from "react";
import {getCart} from "./api/getcart.ts";
import {CartItems} from "./CartItems.tsx";
import {CartType} from "../../types/CartType.ts";
import {Notifications} from "@mantine/notifications";
import {IconCash} from "@tabler/icons-react";

export const Cart = () => {
    const [data, setData] = useState<CartType[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCart = async () => {
        try {
            const response = await getCart();
            setData(response);
        } catch (error) {
            console.error("Error fetching offer:", error);
        }
    };

    const updateTotalPrice = (priceChange: number) => {
        setTotalPrice((prevTotal)=> prevTotal + priceChange);
    }

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
                <>
                    <Paper shadow="xl" p="lg" radius="lg" mt="lg" style={{ maxWidth: '70%', margin: ' auto' }}>
                        <List p="lg" ml="xl" mr="xl">
                            {data.map((item) => <CartItems key={item.ysaId} item={item} refreshCart={fetchCart} updateTotalPrice={updateTotalPrice}/>)}
                        </List>
                    </Paper>
                    <Group pos="fixed" p="xs" left="0" bottom="0" w="100%" justify="center" bg="dark">
                        <Text c="white" size="lg">Całkowita cena: {totalPrice} PLN </Text>
                        <Button variant="outline" className="buttonCover" color="white"
                        onClick={()=>Notifications.show({color: "green", title: "Sukces", message: "Udało się zrealizować płatność!",autoClose: 4000, })}
                        >Kupuję i płacę <IconCash style={{marginLeft:"4", color:"orange"}}/></Button>
                    </Group>
                </>
            )}
        </div>
    )
}