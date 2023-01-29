import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../APIs/auth';



function Profile() {

    const dispatch = useDispatch();
    const token = localStorage.getItem("token")

    useEffect(()=>{
        dispatch(getUserDetails({token:token}, data=>{
            console.log(data,'profile page')
        }))
    },[])



    return (

        <>
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
                <img className="object-cover h-[20rem] w-full" src={"https://i.ibb.co/z654xFk/bg-walp.jpg"} alt="background" />
            </div>

            <section class="absolute bg-blueGray-200 mt-[10rem]">

                <div class="container mx-auto px-4">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div class="px-6">
                            <div class="flex flex-wrap justify-center">
                                <div class="w-fit lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    
                                        <img alt="profileImage" src="https://i.ibb.co/QrwzjST/34.jpg" className="object-cover shadow-xl rounded-full h-44  w-44 align-middle border-none  -m-16 -ml-20 lg:-ml-16 ml-20" />
                                    
                                </div>
                                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div class="py-6 px-3 mt-32 sm:mt-0">
                                        <button class="bg-my-blue active:bg-my-yellow uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div class="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div class="mr-4 p-3 text-center">
                                            <span class="text-md font-bold block uppercase tracking-wide text-my-blue">22</span><span class="text-xs text-blueGray-400">Friends</span>
                                        </div>
                                        <div class="mr-4 p-3 text-center">
                                            <span class="text-md font-bold block uppercase tracking-wide text-my-blue">10</span><span class="text-xs text-blueGray-400">Photos</span>
                                        </div>
                                        <div class="lg:mr-4 p-3 text-center">
                                            <span class="text-md font-bold block uppercase tracking-wide text-my-blue">89</span><span class="text-xs text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-12">
                                <h3 class="text-4xl font-semibold leading-normal mb-2 text-my-blue mb-2">
                                    Himanshu Dixit
                                </h3>
                                <div class="text-sm leading-normal mt-0 mb-2 text-my-yellow font-bold uppercase">
                                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    Los Angeles, California
                                </div>
                                <div class="mb-2 text-sm text-gray-400 mt-10">
                                    Founder and CTO @mymemecenter.com
                                </div>
                                <div class="mb-2 text-sm text-gray-400">
                                    University of Souther California, USA
                                </div>
                            </div>
                            <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-9/12 px-4">
                                        <p class="mb-4 text-xs leading-relaxed text-blueGray-700">
                                            An artist of considerable range, Jenna the name taken by
                                            Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                            performs and records all of his own music, giving it a
                                            warm, intimate feel with a solid groove structure. An
                                            artist of considerable range.
                                        </p>
                                        <a href="#pablo" class="font-normal text-sm text-my-blue">Show more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                    <div class="container mx-auto px-4">
                        <div class="flex flex-wrap items-center md:justify-between justify-center">
                            <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div class="text-sm text-blueGray-500 font-semibold py-1">
                                    {/* Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default Profile