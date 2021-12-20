import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [error, setError] = useState('');
    
    return (
        <section class="bg-blueGray-50 mt-12">
            <div class="w-full lg:w-4/12 px-4 mx-auto pt-6 ">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 border-2 border-gray-200">
                <div class="rounded-t mb-0 px-6 py-6">
                    <div class="text-center mb-3">
                    <h6 class="text-blueGray-500 text-sm font-bold">
                        Sign in with
                    </h6>
                    </div>
                    <div class="btn-wrapper text-center">
                    
                    <button class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150 w-full border-2 border-gray-900" style={{justifyContent: 'center'}} type="button">
                        <img alt="..." class="w-10 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google </button>
                    </div>
                    <hr class="mt-6 border-b-1 border-blueGray-700" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div class="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign in with credentials</small>
                    </div>
                    <form >
                        <div class="relative w-full mb-3 mt-7">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 " for="grid-password">Email</label><input  type="email" class=" border-2 border-gray-900 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                        </div>
                        <div class="relative w-full mb-3 mt-7">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 " for="grid-password">Email</label><input  type="email" class=" border-2 border-gray-900 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                        </div>
                        <div class="relative w-full mb-3 mt-7">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Password</label><input type="password" class="border-2 border-gray-900 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                        </div>
                        <div class="relative w-full mb-3 mt-7">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Password</label><input type="password" class="border-2 border-gray-900 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                        </div>
                        <p style={{color: 'red'}}>{error}</p>
                        <div class="text-center mt-6">
                            <button class="bg-gray-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit"> Sign In </button>
                        </div>
                        <Link to='/login'><p className='mt-5 m-2 text-sm font-semibold text-blueGray-600'>Have account?</p></Link>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Register
