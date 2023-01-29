import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginUser } from '../APIs/auth';
import { useState, useEffect } from 'react';
import companyLogo from '../assets/mymemcenterlogo.png';
import { useAlert, types } from 'react-alert';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Tooltip from '@mui/material/Tooltip';



function LogIn() {

    const initFormData = {
        email: '',
        password: ''
    }

    const initFormDataError = {
        email: '',
        password: ''
    }

    const [formData, setFormData] = useState(initFormData);
    const [formDataError, setFormDataError] = useState(initFormDataError);
    const [showPassword, setShowPassword] = useState(false);

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert()

    // useEffect((e) => {
    //     const listener = event => {
    //         if (event.code === "Enter" || event.code === "NumpadEnter") {
    //             event.preventDefault();
    //             handleLogin();
    //         }
    //     };
    //     document.addEventListener("keydown", listener);
    //     return () => {
    //         document.removeEventListener("keydown", listener);
    //     };
    // }, []);


    const handleLogin = () => {
        if (!formData?.email) {
            setFormDataError(state => ({
                ...state,
                email: true
            }))
        } else if (!formData?.password) {
            setFormDataError(state => ({
                ...state,
                password: true
            }))
        } else {
            setFormDataError(initFormDataError);
            dispatch(loginUser(formData, data => {
                if (data?.status === 200 && data?.data?.status === "ok") {
                    localStorage.setItem("token", data?.data?.token);
                    localStorage.setItem("isLoggedIn", 'true');
                    alert.show(`Logged In successfully`, { type: types.SUCCESS });
                    navigate('/profile');
                } else if (data?.status === 200 && data?.data?.status === "invalid email") {
                    alert.show("invalid email, try again with another email", { type: types.ERROR });
                    setFormDataError(state => ({
                        ...state,
                        email: true
                    }))

                } else if (data?.status === 200 && data?.data?.status === "invalid password") {
                    alert.show("invalid password, try again with another password", { type: types.ERROR });
                    setFormDataError(state => ({
                        ...state,
                        password: true
                    }))
                }
            }))
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setFormData(prevState => ({
                ...prevState,
                email: value
            }))
            setFormDataError(prev => ({
                ...prev,
                email: ''
            }))
        }
        if (name === 'password') {
            setFormData(prevState => ({
                ...prevState,
                password: value
            }))
            setFormDataError(prev => ({
                ...prev,
                password: ''
            }))
        }

    }
const clickShowPassword = () => {
    setShowPassword(state=>!state)
}
    return (
        <>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex flex-col justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div style={{ 'display': 'flex', 'justify-content': 'center' }} className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src={companyLogo}
                                className="w-80 bg-my-blue p-6 mb-8 rounded-[10px]"
                                alt="memecenter"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 ">
                            <form>
                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="email"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                    {formDataError?.email === true ? <p className='text-xs text-red-600 text-left mt-1'>Wrong Email, Try Again with Another One</p> : null}
                                </div>
                                <div className="mb-6">
                                    <div className='flex flex-row'>
                                        <input
                                            onChange={onChange}
                                            name="password"
                                            type={!showPassword ? "password" : "text"}
                                            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            placeholder="Password"
                                        ></input>
                                        <Tooltip title="show password" arrow>
                                            {!showPassword ? <AiFillEye onClick={clickShowPassword} className='text-[30px] m-2 text-my-yellow bg-my-blue p-1 rounded hover:cursor-pointer'/> : <AiFillEyeInvisible onClick={clickShowPassword} className='text-[25px] m-2 text-my-yellow bg-my-blue p-1 rounded hover:cursor-pointer'/> }
                                        </Tooltip>
                                    </div>
                                    {formDataError?.password === true ? <p className='text-xs text-red-600 text-left mt-1'>Wrong Password, Try Again with Another One</p> : null}
                                </div>
                                <div class="flex justify-between items-center mb-6">
                                    <button onClick={() => {
                                        navigate('/register');
                                    }} className='text-blue-400 text-sm'>Do not have an account, Create one</button>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLogin}
                                    class="inline-block px-7 py-3 bg-my-blue text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full"

                                >
                                    Sign in
                                </button>
                                <div
                                    class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p class="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>
                                <a
                                    class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{ "background-color": "#3b5998" }}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        class="w-3.5 h-3.5 mr-2"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>Continue with Facebook</a>
                                <a
                                    class="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                    style={{ "background-color": "#55acee" }}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Twitter --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        class="w-3.5 h-3.5 mr-2"
                                    >
                                        {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                        /></svg>Continue with Twitter
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default LogIn