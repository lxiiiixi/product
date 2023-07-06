import { lazy, ReactNode, Suspense } from "react";
import { type RouteObject } from "react-router-dom";

import PageLayout from "@/sections/PageLayout";
const Login = lazy(() => import("@/pages/login"));
const NotFound = lazy(() => import("@/pages/404"));
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));

const lazyLoad = (conponent: ReactNode): ReactNode => {
    return <Suspense fallback={<span>A loading component here</span>}>{conponent}</Suspense>;
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: lazyLoad(<Home />),
            },
            {
                path: "/home",
                element: lazyLoad(<Home />),
            },
            {
                path: "/about",
                element: lazyLoad(<About />),
            },
        ],
    },
    {
        path: "/login",
        element: lazyLoad(<Login />),
    },
    {
        path: "*",
        element: lazyLoad(<NotFound />),
    },
];

export default routes;
