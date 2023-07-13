import { RouteObject } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { lazy } from 'react'
import { PATH } from './config/path'


const Home = lazy(() => import('./pages'))
const Share = lazy(() => import('./pages/Share'))

export const routers: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                element: <Share />,
                path: PATH.share
            }
        ]
    }
]