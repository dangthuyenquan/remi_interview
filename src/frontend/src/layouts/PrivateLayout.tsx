import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/stores/authReducer';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import React from 'react';
import { useSnackbar } from 'notistack';
export interface PrivateLayoutProps { }

export const PrivateLayout: React.FC<PrivateLayoutProps> = () => {

    let auth = useAuth();

    const isLogin = auth.isLogin();

    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {

        if (!auth.isLogin()) {
            enqueueSnackbar('You must be logged in to share a video.', { variant: 'warning' });
        }

    }, []);

    if (!isLogin) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}