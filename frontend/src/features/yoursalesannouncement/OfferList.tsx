import {useSearchParams} from "react-router-dom";

export const OfferList = () =>{
    const [searchParams] = useSearchParams();

    return <div>{searchParams}</div>
}