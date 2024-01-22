import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { HrefProps } from './interfaces';
import { Link, useLocation } from "react-router-dom";

const Login = ({ hrefLink }: HrefProps) => {
    const [cookieReceived, setCookieReceived] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    const [username, setUsername] = useState<string>('srgaerg');
    const [password, setPassword] = useState<string>('');

    const [usernamePasswordError, setUsernamePasswordError] = useState<Boolean>(false);


    useEffect(() => {
        setUsername(state?.username);
        setPassword(state?.password);
    }, [state]);

    const signIn = (username: string, password: string) => {
        
        const loginRequestOptions: RequestInit = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        fetch(hrefLink + '/login', loginRequestOptions)
            .then(
                (res) => {
                    if (!res.ok) {
                        throw new Error('Wrong Password, Server not available');
                    }
                    else {
                        setCookieReceived(true);
                    }
                }
            )
            .catch((error) => {
                throw new Error(error);
            });
    };

    useEffect(() => {
        if (cookieReceived === true) {
            navigate('/restapipage', { state: cookieReceived, replace: true });
        }
    }, [cookieReceived]);

    return (
        <>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10 h-fit"
                onSubmit={
                    (e) => {
                        e.preventDefault();
                        if (username && password) {
                            signIn(username, password);
                        }

                    }
                }
            >
                <h1 className="text-xl font-bold pb-2">LOGIN</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500" id="username" type="text" placeholder="Username"
                        value={username || ''}
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            setUsername(target.value);
                        }
                        }
                    />
                </div>
                {/* <div className="mb-1"> */}
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    value={password || ''}
                    className="mb-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500" id="passwordInputField" type="password" placeholder="******************"
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        setPassword(target.value);
                    }
                    }
                />
                {/* <p className="text-red-500 text-xs italic">Please enter the password.</p> */}
                {/* </div> */}
                <div className="mb-6">
                    <input type="checkbox" className="mr-1"
                        onChange={
                            (e) => {
                                const passwordInputElement = document.getElementById('passwordInputField') as HTMLInputElement;

                                if (e.target.checked === true) {
                                    passwordInputElement.type = 'text';
                                } else {
                                    passwordInputElement.type = 'password';
                                }
                            }
                        }
                    />
                    <label htmlFor="password" className="text-sm">Show Password</label>
                </div>

                {/* <div className="flex items-center justify-between"> */}
                <button
                    className="flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    // onClick={
                    //     (e) => {
                    //         if (username && password) {
                    //             signIn(username, password);
                    //         }
                    //     }
                    // }
                >
                    Sign In
                </button>
                {/* </div> */}
                <div id="errorDiv">
                    {
                        (usernamePasswordError)
                            ? <p className="text-red-500 text-xs italic">Username not existent or/and wrong password</p>
                            : <></>
                    }
                </div>
                <p className="pt-3 text-sm">
                    Need an account? <Link className="underline" to="/register">SIGN UP</Link>
                </p>

            </form>

        </>
    )
};

export default Login;