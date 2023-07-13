import { Link, NavLink } from 'react-router-dom'
import { PATH } from '@/config/path'
import styled from 'styled-components'

export interface HeaderProps { }

const Logo = styled.img`
    width: 50px;
    height: auto;
`

export const Header: React.FC<HeaderProps> = () => {
    return (
        <div>
            <div className='container mx-auto flex items-center py-2'>
                <Link to={PATH.home}>
                    <Logo alt='Logo' src="/images/logo-home.png" />
                </Link>

                <div className=" flex gap-5 items-center flex-1 justify-end">

                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-700 sm:max-w-md">
                        <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Email" />
                    </div>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-700 sm:max-w-md">
                        <input type="password" name="password" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Password" />
                    </div>

                    {/* <input className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' style={{ border: '1px solid', padding: '4px 8px' }} placeholder="Email" type="email" /> */}
                    {/* <input style={{ border: '1px solid', padding: '4px 8px' }} placeholder="Password" type="password" /> */}
                    {/* <button style={{ border: '1px solid', padding: '4px 8px' }}>Login / Register</button> */}
                    <button type="submit" className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Login / Register</button>
                </div>
            </div>
            <hr />
        </div>
    )
}