import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { PATH } from '@/config/path'
import { logout, useAuth } from '@/stores/authReducer'
import { useDispatch } from 'react-redux';

function UserInfo() {

    const auth = useAuth();

    const dispath = useDispatch();

    const handleLogout = () => {
        dispath(logout());
    }

    return (
        <div className=" flex gap-5 items-center flex-1 justify-end">
            <h2>{auth.email}</h2>

            <NavLink to={PATH.share} className={"rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"}>
                Share a movie
            </NavLink>

            <button
                type="button"
                className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div >
    )
}

export default UserInfo