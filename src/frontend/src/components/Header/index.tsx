import { PATH } from '@/config/path'
import { useAuth } from '@/stores/authReducer'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import UserInfo from './UserInfo'

export interface HeaderProps { }

const Logo = styled.img`
    width: 50px;
    height: auto;
`

export const Header: React.FC<HeaderProps> = () => {

    const auth = useAuth();

    const isLogin = auth.isLogin();

    return (
        <div>
            <div className='container mx-auto flex items-center py-2'>
                <Link to={PATH.home}>
                    <Logo alt='Logo' src="/images/logo-home.png" />
                </Link>

                {
                    isLogin ?
                        <UserInfo />
                        :
                        <LoginForm />
                }
            </div>
            <hr className='mt-2' />
        </div>
    )
}

interface InputData {
    value: string,
    Validation: boolean
}