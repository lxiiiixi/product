import { lazy, ReactNode, Suspense } from 'react';
import { type RouteObject } from 'react-router-dom';
import { Spin } from 'antd';

import PageLayout from '@/sections/PageLayout';
import LandPageLayout from '@/sections/LandPageLayout';

const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const Product = lazy(() => import('@/pages/Product'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Monitor = lazy(() => import('@/pages/ObjectMonitor'));
const Strategy = lazy(() => import('@/pages/Strategies'));
const Situation = lazy(() => import('@/pages/Situation'));
const Service = lazy(() => import('@/pages/Service'));
const RiskAlert = lazy(() => import('@/pages/RiskAlert'));
const RiskAlertDetail = lazy(() => import('@/pages/RiskAlert/[id]'));
const ObjectRuleDetail = lazy(() => import('@/pages/Rule/[id]'));

const NotFound = lazy(() => import('@/pages/Others/404'));
const Components = lazy(() => import('@/pages/Others/Components'));

const lazyLoad = (conponent: ReactNode): ReactNode => {
    return (
        <Suspense
            fallback={
                <div className="flex-center w-full h-full">
                    <Spin />
                </div>
            }
        >
            {conponent}
        </Suspense>
    );
};

const routes: RouteObject[] = [
    {
        path: '/',
        element: <PageLayout />,
        children: [
            {
                path: '/dashboard',
                element: lazyLoad(<Dashboard />)
            },
            {
                path: '/monitor',
                element: lazyLoad(<Monitor />)
            },
            {
                path: '/risk',
                children: [
                    {
                        path: '/risk',
                        element: lazyLoad(<RiskAlert />)
                    },
                    {
                        path: '/risk/:id',
                        element: lazyLoad(<RiskAlertDetail />)
                    }
                ]
            },
            {
                path: '/strategy',
                element: lazyLoad(<Strategy />)
            },
            {
                path: '/situation',
                element: lazyLoad(<Situation />)
            },
            {
                path: '/service',
                element: lazyLoad(<Service />)
            },
            {
                path: '/rule',
                children: [
                    {
                        path: '/rule/:id',
                        element: lazyLoad(<ObjectRuleDetail />)
                    }
                ]
            }
        ]
    },
    {
        path: '/product',
        element: <LandPageLayout />,
        children: [
            {
                path: '/product',
                element: lazyLoad(<Product />)
            },
            {
                path: '/product/login',
                element: lazyLoad(<Login />)
            },
            {
                path: '/product/signup',
                element: lazyLoad(<SignUp />)
            }
        ]
    },
    {
        path: '/components',
        element: lazyLoad(<Components />)
    },
    {
        path: '*',
        element: lazyLoad(<NotFound />)
    }
];

export default routes;
