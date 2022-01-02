import React from 'react'
import useAuth from './../../CustomHooks/useAuth';

const UserProfile = () => {

    const { user } = useAuth();

    const displayPicture = ['https://i.pinimg.com/564x/b7/b6/5d/b7b65d8c3ed8b5f45486e0ca3eb3bd1f.jpg', 'https://i.pinimg.com/564x/7a/77/e0/7a77e0ec6c81f5e588c6b46c864f95c2.jpg', 
                            'https://i.pinimg.com/564x/bd/5d/d7/bd5dd7757a31840758d6c2542017ef4e.jpg', 'https://i.pinimg.com/564x/b7/eb/61/b7eb6125f2ba4a4c1008276b00ff926d.jpg', 
                            'https://i.pinimg.com/564x/38/5a/bd/385abd116cae70b3c8ddf8ccee764ef0.jpg'];

                                      
    const random = Math.floor(Math.random() * displayPicture.length);

    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img class="object-cover object-center rounded w-full h-full" alt="hero" src={displayPicture[random]} />
                    </div>
                    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
                        <br class="hidden lg:inline-block" />readymade gluten
                    </h1>
                    <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
                    <div class="flex justify-center">
                        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile
