import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
export interface MainLayoutProps { }

export const MainLayout: React.FC<MainLayoutProps> = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}