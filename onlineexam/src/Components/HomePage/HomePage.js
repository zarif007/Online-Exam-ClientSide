import React from 'react'
import { Link } from 'react-router-dom'
import banner from '../../images/banner.png'

const HomePage = () => {
  return (
    <>
      <section class="bg-gray-200 py-20 lg:py-28">
            <div class="container mx-auto px-5 text-center">
                <div class="mb-6">
                    <div class="space-y-4 mb-12">
                        <h4 class="text-2xl sm:text-3xl font-semibold">WelCome to HailOnline</h4>
                        <h1 class="text-5xl sm:text-7xl font-bold">Make Online MCQ based Exams</h1>
                    </div>
                    <div className="grid justify-items-center">
                        <Link href="#0" class=" mt-9 border-2 border-gray-900 font-semibold leading-none text-white py-4 px-10 bg-gray-900 hover:border-gray-800 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">Make Exam</Link>
                        <Link href="#0" class=" mt-9 border-2 border-gray-900 font-semibold leading-none text-gray-900 py-4 px-10 hover:border-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">Join Exam</Link>
                    </div>
                        
                </div>
                <img class="mx-auto xl:max-w-screen-lg mb-28" src={banner} alt="banner" />
                
            </div>
        </section>
    </>
  )
}

export default HomePage
