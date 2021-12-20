import React, { useState } from 'react'
import {  useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useAuth from '../../../CustomHooks/useAuth';


const LogIn = () => {

    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const {signInWithGoogle, setIsLoading, setUser} = useAuth();

    const loaction = useLocation();
    const history = useHistory();
    const redirect_url = loaction.state?.from || '/';


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                setUser(res.user);
                history.push(redirect_url);
            })
            .finally(() => setIsLoading(false))
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleSignIn = e => {
        e.preventDefault();
        processLogin(email, password);
    }

    const processLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(res => { 
                const user = res.user;
                console.log(user);
                setUser(res.user);
                history.push(redirect_url);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }
   

    return (
        <section class="bg-blueGray-50 mt-12">
            <div class="w-full lg:w-4/12 px-4 mx-auto pt-6 ">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 border-2 border-gray-200">
                <div class="rounded-t mb-0 px-6 py-6">
                    <div class="text-center mb-3">
                    <h6 class="text-blueGray-500 text-sm font-bold">
                        Sign In with
                    </h6>
                    </div>
                    <div class="btn-wrapper text-center">
                    
                    <button onClick={handleGoogleSignIn} class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150 w-full border-2 border-gray-900" style={{justifyContent: 'center'}} type="button">
                        <img alt="..." class="w-10 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google </button>
                    </div>
                    <hr class="mt-6 border-b-1 border-blueGray-700" />
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div class="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign In with credentials</small>
                    </div>
                    <form onSubmit={handleSignIn}>
                        <div class="relative w-full mb-3 mt-7">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2 " for="grid-password">Email</label><input onBlur={handleEmailChange} type="email" class=" border-2 border-gray-900 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Email" />
                        </div>
                        <div class="relative w-full mb-3 mt-7">
                            <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Password</label><input onBlur={handlePasswordChange} type="password" class="border-2 border-gray-900 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Password" />
                        </div>
                        <p style={{color: 'red'}}>{error}</p>
                        <div class="text-center mt-6">
                            <button class="bg-gray-900 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit"> Sign In </button>
                        </div>
                        <Link to='/register'><p className='mt-5 m-2 text-sm font-semibold text-blueGray-600'>Create Account</p></Link>
                    </form>
                </div>
                </div>
            </div>
        </section>
    )
}

export default LogIn
