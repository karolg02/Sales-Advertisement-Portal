import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout.tsx";
import {ErrorPage} from "./error/ErrorPage.tsx";
import {LoginPage} from "./login/LoginPage.tsx";
import {useIsLogged} from "../hooks/useIsLogged.ts";
import {OfferForm} from "./yoursalesannouncement/OfferForm.tsx";
import {OfferList} from "./yoursalesannouncement/OfferList.tsx";
import {RegisterPage} from "./register/RegisterPage.tsx";
import {MyOffers} from "./myoffers/MyOffers.tsx";
import {SingleOffer} from "./singleoffer/SingleOffer.tsx";
import {Cart} from "./cart/Cart.tsx";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        children: [
            {
                path: '/login',
                element: <LoginPage/>
            },{
                path: '/register',
                element: <RegisterPage/>
            },
            {
                path: '*',
                element: <Navigate to="/login" replace/>
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
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
                        path: '/offer/:id',
                        element: <SingleOffer/>
                    },
                    {
                        path: '/myoffers',
                        element: <MyOffers/>
                    },
                    {
                        path: '/mycart',
                        element: <Cart/>
                    },
                    {
                        path: '*',
                        element: <ErrorPage/>
                    }
                ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes : publicRoutes;
    return useRoutes(routes);
}