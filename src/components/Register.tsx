import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import { HrefProps } from './interfaces';
import { Link, redirect, Navigate, useNavigate, createSearchParams } from "react-router-dom";

function validPassword(password: string) {
    const passwordValidatorRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

    if (passwordValidatorRegex.test(password)) {
        return true;
    }
    return false;
}

function errorsPassword(password: string) {
    const lengthPassword = /^.{8,32}$/;
    const upperCasePassword = /.*[A-Z].*/;
    const lowerCasePassword = /.*[a-z].*/;
    const numberPassword = /.*[0-9].*/;
    const specialPassword = /.*[!@#$%^&*()_+{}\[\]:;<>,.?~].*/;

    const errors = [false, false, false, false, false, false];
    if (!password) {
        return errors;
    }

    if (!lengthPassword.test(password)) {
        errors[0] = true;

    }
    if (!upperCasePassword.test(password)) {
        errors[1] = true;
    }
    if (!lowerCasePassword.test(password)) {
        errors[2] = true;
    }
    if (!numberPassword.test(password)) {
        errors[3] = true;
    }
    if (!specialPassword.test(password)) {
        errors[4] = true;
    }
    return errors;
}

const Register = ({ hrefLink }: HrefProps) => {
    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string>();
    // const [errors, setErrors] = useState<boolean[]>([false, false, false, false, false, false]);
    const [lengthError, setLengthError] = useState<boolean>(false);
    const [upperCaseError, setUpperCaseError] = useState<boolean>(false);
    const [lowerCaseError, setLowerCaseError] = useState<boolean>(false);
    const [numberError, setNumberError] = useState<boolean>(false);
    const [specialCharacterError, setSpecialCharactarError] = useState<boolean>(false);
    const [notEqualError, setNotEqualError] = useState<boolean>();
    const [transferError, setTransferError] = useState<boolean>(false);
    const [userAlreadyExistError, setUserAlreadyExistError] = useState<boolean>(false);
    const [userFieldEmptyError, setUserFieldEmptyError] = useState<boolean>(false);

    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState<boolean>(false);


    const signUp = (username: string | undefined, password: string | undefined) => {

        const registerRequestOptions: RequestInit = {
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
        fetch(hrefLink + '/register', registerRequestOptions)
            .then(
                (res) => {
                    if (res.ok) {
                        setTransferError(false);
                        setIsRegistered(true);
                    }
                    else {
                        setTransferError(true);
                    }
                }
            )
            .catch((error) => {
                setTransferError(true);
            });
    };

    useEffect(() => {
        // Checking if user is not loggedIn
        if (isRegistered) {
            navigate('/', { state: { username: username, password: password } });
        }
    }, [navigate, isRegistered]);

    return (
        <>
            <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10 h-fit"
                onSubmit={
                    (e) => {
                        if (username && password) {
                            signUp(username, password);
                        }

                    }
                }
            >
                <h1 className="text-xl font-bold pb-2">SIGN UP</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;

                            if (!target.value) {
                                setUsername(undefined);
                                return;
                            }
                            setUsername(target.value);

                        }
                        }
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="passwordInputField"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            const errorsArray = errorsPassword(target.value);

                            errorsArray[0] ? setLengthError(true) : setLengthError(false);
                            errorsArray[1] ? setUpperCaseError(true) : setUpperCaseError(false);
                            errorsArray[2] ? setLowerCaseError(true) : setLowerCaseError(false);
                            errorsArray[3] ? setNumberError(true) : setNumberError(false);
                            errorsArray[4] ? setSpecialCharactarError(true) : setSpecialCharactarError(false);


                            if (validPassword(target.value)) {
                                setPassword(target.value);
                            } else if (password) {
                                setPassword(undefined);
                            }
                        }
                        }
                    />
                </div>
                {/* <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Confirm Password
                    </label>
                    <input
                        id="secondPasswordField"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;

                            if (!target.value) {
                                setNotEqualError(false);
                                return;
                            }
                            if (target.value !== firstPassword) {
                                // setLengthError(false)
                                // setUpperCaseError(false)
                                // setLowerCaseError(false)
                                // setNumberError(false)
                                // setSpecialCharactarError(false)
                                setNotEqualError(true)
                            } else {
                                // setLengthError(false)
                                // setUpperCaseError(false)
                                // setLowerCaseError(false)
                                // setNumberError(false)
                                // setSpecialCharactarError(false)
                                setNotEqualError(false)

                                setSecondPassword(target.value);
                            }
                            // if (validPassword(target.value)) {
                            //     setSecondPassword(target.value);
                            // }
                        }
                        }
                    />
                </div> */}
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

                <div className="errorDiv mb-6">
                    {
                        (lengthError)
                            ? <p className="text-red-500 text-xs italic">min 8 characters (max 32)</p>
                            : <></>
                    }
                    {
                        (upperCaseError)
                            ? <p className="text-red-500 text-xs italic">at least one upper case letter</p>
                            : <></>
                    }
                    {
                        (lowerCaseError)
                            ? <p className="text-red-500 text-xs italic">at least one lower case letter</p>
                            : <></>
                    }
                    {
                        (numberError)
                            ? <p className="text-red-500 text-xs italic">one number</p>
                            : <></>
                    }
                    {
                        (specialCharacterError)
                            ? <p className="text-red-500 text-xs italic">one special character</p>
                            : <></>
                    }
                    {/* {
                        (notEqualError)
                            ? <p className="text-red-500 text-xs italic">not equal</p>
                            : <></>
                    } */}
                    {
                        (transferError)
                            ? <p className="text-red-500 text-xs italic">transfer failed</p>
                            : <></>
                    }
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                        onClick={
                            (e) => {
                                if (username && password) {
                                    signUp(username, password);
                                }

                            }
                        }
                    >
                        Sign Up
                    </button>
                </div>
                <p className="pt-3 text-sm">
                    Already an user? <Link className="underline" to="/">LOGIN</Link>
                </p>
            </form>
        </>
    );
};

export default Register;