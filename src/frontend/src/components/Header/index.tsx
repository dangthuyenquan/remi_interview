import { Link, NavLink } from 'react-router-dom'
import { PATH } from '@/config/path'
export interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
    return (
        <div className='bg-[#888] text-white'>
            <div className='container mx-auto flex items-center py-2'>
                <Link to={PATH.home}>
                    <img alt='Logo' />
                </Link>

                <div className="menu flex gap-5 items-center flex-1 justify-end">
                    <NavLink to={PATH.home}>Home</NavLink>
                    <NavLink to={PATH.myRecord}>My Record</NavLink>
                    <NavLink to={PATH.health}>Healthy</NavLink>
                </div>
            </div>
        </div>
    )
}