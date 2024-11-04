import {CartType} from "../../types/CartType.ts";
import {useEffect, useState} from "react";
import {OfferType} from "../../types/OfferType.ts";
import {getOffer} from "../singleoffer/api/getOffer.ts";
import {Button, Image, List, Loader, Paper, SimpleGrid, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {deleteFromCart} from "./api/deletefromcart.ts";
import {editcart} from "./api/editcart.ts";

interface CartItemsProps {
    item: CartType,
    refreshCart: () => void,
    updateTotalPrice: (priceChange: number) => void
}

export const CartItems = ({item, refreshCart, updateTotalPrice}: CartItemsProps) => {
    const [offer, setData] = useState<OfferType | null>(null);
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(item.amount);

    const increaseQuantity = () => {
        if (offer){
            if (quantity + 1 <= offer.amount) {
                setQuantity((prev) => prev + 1);
                updateTotalPrice(+offer.price);
            }
        }
    };

    const decreaseQuantity = () => {
        if (quantity - 1 >= 1) {
            setQuantity((prev) => prev - 1);
            if (offer) updateTotalPrice(-offer.price);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getOffer(item.ysaId);
                setData(response);
                updateTotalPrice(response.price*item.amount/2);
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };
        fetch();
    }, [])

    const handleDelete = async (ysaId: number) => {
        try {
            if (offer) {
                updateTotalPrice(-(offer.price * quantity));
            }
            await deleteFromCart(ysaId);
            refreshCart();
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = async (id: number, amount: number) => {
        try{
            if(offer){
                await editcart(id,amount);
                refreshCart();
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    if (!offer) {
        return <Loader/>;
    }

    return (
        <Paper m="lg" shadow="xl" radius="lg">
            <SimpleGrid cols={{base: 1, sm: 2, lg: 3}}>
                <Image
                    src={offer.image}
                    fit="fill"
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
                        Ilość: {item.amount} z {offer.amount} dostępnych
                    </Text>
                </List>
                <List mt="xl" ml="lg" pt="lg">
                    <Button mb="xl" fullWidth c="yellow" radius="md" bg="dark"
                            onClick={() => handleDelete(item.ysaId)}
                            style={{width:"80%", marginRight:"10%", marginLeft:"10%"}}
                    >Usuń</Button>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                        <Button onClick={decreaseQuantity} variant="outline" color="yellow" c="black">-</Button>
                        <Text mx="sm">{quantity}</Text>
                        <Button onClick={increaseQuantity} variant="outline" color="yellow" c="black">+</Button>
                    </div>
                    {quantity!=item.amount && (
                        <Button onClick={()=>handleClick(item.ysaId,quantity)}
                            mt="xl" variant="outline" c="green" color="green" radius="md" style={{width:"80%", marginRight:"10%", marginLeft:"10%"}}>
                            Zatwierdź zmiany
                        </Button>
                    )}
                </List>
            </SimpleGrid>
        </Paper>
    )
}