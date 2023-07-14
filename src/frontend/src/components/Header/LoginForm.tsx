import useInputValidator from '@/hooks/useInputValidator'
import { login } from '@/stores/authReducer';
import React from 'react'
import { useDispatch } from 'react-redux';

function LoginForm() {

    const dispatch = useDispatch();

    const emailInput = useInputValidator('', [
        {
            validator: (value) => value ? true : false,
            message: 'Email is required.',
        },
        {
            validator: (value) => typeof value === 'string' && value.length >= 8,
            message: 'Email must be at least 8 characters long.',
        },
        {
            validator: (value) => typeof value === 'string' && value.length <= 60,
            message: 'Email should be limited to a maximum of 60 characters.',
        },
        {
            validator: (value) => {
                if (typeof value === 'string') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value);
                }
                return false;
            },
            message: 'The email address is not in a valid format.',
        },
    ]);

    const passwordInput = useInputValidator('', [
        {
            validator: (value) => value ? true : false,
            message: 'Password is required.',
        },
    ]);

    const handleOnSubmit = () => {

        //merge input array to check
        const validateInput = [emailInput, passwordInput];

        let isVerified = true;

        validateInput.forEach(input => {
            if (!input.validate()) {
                isVerified = false;
            }
        });

        if (isVerified) {

            dispatch(login({ email: emailInput.value as string }));

        }
    }

    return (
        <div className=" flex gap-5 items-center flex-1 justify-end">
            <div className="flex flex-col relative max-w-lg w-60">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-700 ">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Email"
                        value={emailInput.value}
                        onChange={emailInput.handleChange}
                        onKeyUp={() => {
                            emailInput.validate();
                        }}
                    />
                </div>
                {emailInput.error && <p className='absolute top-full text-xs text-red-600'>{emailInput.error}</p>}
            </div>

            <div className="flex flex-col relative max-w-lg w-60">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-700 ">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Password"
                        autoComplete='off'
                        value={passwordInput.value}
                        onChange={passwordInput.handleChange}
                        onKeyUp={() => {
                            passwordInput.validate();
                        }}
                    />
                </div>
                {passwordInput.error && <p className='absolute top-full text-xs text-red-600'>{passwordInput.error}</p>}
            </div>

            <button
                type="button"
                className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                onClick={handleOnSubmit}
            >
                Login / Register
            </button>
        </div>
    )
}

export default LoginForm