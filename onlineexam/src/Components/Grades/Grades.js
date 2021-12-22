import React from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import useAuth from './../../CustomHooks/useAuth';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import domain from "../../Domain";

const Grades = () => {

    const { exam_id } = useParams();

    const [examInfo, setExamInfo] = useState({})

    const { user } = useAuth();

    useEffect(() => {
        Axios.get(`${domain}grades/${exam_id}/${user.uid}`)
            .then(res => setExamInfo(res.data));
    }, [])

    return (
        <>
        <section class="container px-5 py-24 mx-auto text-gray-100 body-font p-5 bg-gray-900 mt-12">
            <div class="mx-auto flex px-5  md:flex-row flex-col items-center jobcard">
                <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center">
                    
                    <figure class="visible">
                        <div class="">
                            <div class="pt-10 px-2 sm:px-6">
                            <span class="inline-block py-1 px-2 rounded-full bg-gray-100 text-white text-gray-900  text-xs font-bold tracking-widest mb-2">GRADE CARD</span>
                            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-100">{examInfo.name}</h1>
                                <p class="text-gray-100 text-base pb-6">Subject: {examInfo.subject}</p>
                                <p class="text-gray-100 text-base pb-8">Author: {examInfo.author}</p>
                                <p class="text-gray-100 text-base pb-8">Examinee: {user.email}</p>
                            </div>
                        </div>
                    </figure>
                
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-full">
                <div class="py-12 sm:py-12 md:py-6 lg:py-6 xl:py-6 px-8 w-full md:max-w-min sm:w-full bg-white z-30">
                        <h1 class="text-gray-500 font-semibold text-xl ">Grades</h1>
                            <div class="text-center py-4 px-7">
                                <h1 class="text-gray-900 text-7xl font-black m-6">{examInfo.currect_answer}/{examInfo.total_ques}</h1>
                                
                            </div>
                            <div class="h-px bg-gray-200"></div>
                            <button class="w-full mt-6 mb-3 py-2 text-white font-semibold bg-gray-900 hover:shadow-xl duration-200 hover:bg-gray-800">See Currect Answers</button>
                        </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Grades
