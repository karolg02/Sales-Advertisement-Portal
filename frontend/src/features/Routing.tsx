import {RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {OfferList} from "./yoursalesannouncement/OfferList.tsx";
import {OfferForm} from "./yoursalesannouncement/OfferForm.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/offers',
                element: <OfferList/>
            },
            {
                path: '/offers/new',
                element: <OfferForm/>
            },
            {
                path: '/offers/:id',
                element: <OfferForm/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]

export const Routing = () =>{
    return useRoutes(routes);
}