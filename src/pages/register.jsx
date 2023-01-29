import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../APIs/auth';
import { useDispatch } from 'react-redux';
import { HiLightBulb } from 'react-icons/hi';
import { BsCheck2All } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';


import { isUserNameExist_API } from '../APIs/auth';

function Register() {
    const initFormData = {
        user_name: "",
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const onInputValidate = (value, name) => {
        setFormDataError(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
    }
    const initFormDataError = {
        user_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        f_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        l_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        email: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        password: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        confirmPassword: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        }

    }
    const [formData, setFormData] = useState(initFormData);
    const [formDataError, setFormDataError] = useState(initFormDataError);

    const [isUserNameExist, setIsUserNameExist] = useState(null);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     console.log('hey')
    // }, [])
    const alreadyHaveAccountClick = () => {
        navigate('/login');
    }

    const validateForm = () => {
        let isInvalid = false;
        Object.keys(formDataError).forEach(x => {
            const errObj = formDataError[x];
            if (errObj.errorMsg === true) {
                isInvalid = true;
            } else if (errObj.isReq && !formData[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            console.error('Invalid Form!');
        } else if (formData?.password !== formData?.confirmPassword) {
            console.error('password not matched');
        } else if (isUserNameExist === true) {
            console.error('user name already exist');
        } else {
            dispatch(registerUser(formData, data => {
                console.log(data, 'good to go')
            }))
        }
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "user_name") {
            if(!formData?.user_name){

            }else{
                
            }
            dispatch(isUserNameExist_API({ user_name: value }, data => {
                if (data?.data?.isExist === false) {
                    setIsUserNameExist(false);
                } else {
                    setIsUserNameExist(true);
                }
            }))
            setFormData(state => ({
                ...state,
                user_name: value,
            }))
        } else {
            setFormData(state => ({
                ...state,
                [name]: value
            }))
        }
    }
    return (
        <>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-5/12 ">
                            <form onSubmit={handleRegister}>
                                <p className='text-my-blue text-xs flex flex-row align-center'><HiLightBulb className=" mb-2 mr-1 text-my-blue text-lg" /> User Name is strictly required, This will be unique name of your profile.</p>
                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="user_name"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="User Name"
                                    />

                                    {isUserNameExist === true && <p className='text-red-600 text-xs text-left mt-1 flex flex-row'><RxCross2 className="text-red-600 text-lg mr-1" />Sorry, User name does not exist</p>}

                                    {isUserNameExist === false && <p className='text-green-600 text-xs text-left mt-1 flex flex-row'><BsCheck2All className="text-red-600 text-lg mr-1" />Great, User name exist</p>}

                                    {formDataError?.user_name?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="f_name"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="First Name"
                                    />
                                    {formDataError?.f_name?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="l_name"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Last Name"
                                    />
                                    {formDataError?.l_name?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="email"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                    {formDataError?.email?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="password"
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                    {formDataError?.password?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="confirm_password"
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Confirm Password"
                                    />
                                    {formDataError?.confirmPassword?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <button onClick={alreadyHaveAccountClick} className='text-blue-400 text-sm'>Already have an account, Sign in now</button>
                                </div>

                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Register Now
                                </button>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{ "backgroundColor": "#3b5998" }}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Facebook --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        className="w-3.5 h-3.5 mr-2"
                                    >
                                        {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>Continue with Facebook</a>
                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                    style={{ "backgroundColor": "#55acee" }}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Twitter --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-3.5 h-3.5 mr-2"
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
            </section>
        </>
    )
}

export default Register