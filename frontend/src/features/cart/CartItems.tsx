import {CartType} from "../../types/CartType.ts";
import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import {getOffer} from "../singleoffer/api/getOffer.ts";
import {Button, Image, List, Loader, Paper, SimpleGrid, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {deleteFromCart} from "./api/deletefromcart.ts";
import {Notifications} from "@mantine/notifications";

interface CartItemsProps {
    item: CartType
}

export const CartItems = ({item}: CartItemsProps) => {
    const [offer, setData] = useState<OfferType | null>(null);
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(item.amount);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    useEffect(() => {
        const fetch = async () => {
            try{
                const response = await getOffer(item.ysaId);
                setData(response);
            }
            catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
        fetch();
    },[])

    const handleDelete =  async (ysaId: number) => {
        try{
            return await deleteFromCart(ysaId);
        }catch (error) {
            console.error(error);
        }
    }

    if (!offer) {
        return <Loader />;
    }

    return (
        <Paper m="lg" shadow="xl" radius="lg" >
            <Notifications style={{ position: 'fixed', bottom: 30, right: 0 }} />
            <SimpleGrid cols={{base:1,sm:2,lg:3}}>
                <Image
                    src={offer.image}
                    mih="20vh"
                    h="20vh"
                    w="20vw"
                    miw="20vh"
                    fit="cover"
                    style={{borderBottomLeftRadius: "1em", borderTopLeftRadius: "1em", cursor: "pointer"}}
                    onClick={() => navigate(`/offer/${offer?.id}`)}
                />
                <List mt="xl" ml="lg">
                    <Text size="lg" fw={600}>
                        {offer.title}
                    </Text>
                    <Text c="green" size="lg" fw={600}>
                        {offer.price} PLN
                    </Text>
                    <Text>
                        Ilość: {item.amount}
                    </Text>
                </List>
                <List mt="xl" ml="lg" pt="lg">
                    <Button mb="lg" fullWidth c="yellow" radius="md" bg="dark"
                    onClick={() => handleDelete(item.ysaId)}
                    >Usuń</Button>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                        <Button onClick={decreaseQuantity} variant="outline" color="yellow" c="black">-</Button>
                        <Text mx="sm">{quantity}</Text>
                        <Button onClick={increaseQuantity} variant="outline" color="yellow" c="black">+</Button>
                    </div>
                </List>
            </SimpleGrid>
        </Paper>
    )
}