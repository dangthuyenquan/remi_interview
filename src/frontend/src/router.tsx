import { RouteObject } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import {lazy} from 'react'
import { PATH } from './config/path'


const Home = lazy(() => import('./pages'))
const Health = lazy(() => import('./pages/health'))
const MyRecord = lazy(() => import('./pages/my-record'))

export const routers: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                element: <Home />,
                index: true
            },
            {
                element: <MyRecord />,
                path: PATH.myRecord
            },
            {
                element: <Health />,
                path: PATH.health
            }
        ]
    }
]