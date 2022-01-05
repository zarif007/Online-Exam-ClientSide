import React, { useEffect, useState } from 'react'
import useAuth from './../../CustomHooks/useAuth';
import Axios from 'axios'
import domain from "../../Domain";
import dateFormatter from './../../dateFormatter';
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';


const UserProfile = () => {

    const { user } = useAuth();

    const [createdExam, setCreatedExam] = useState([]);
    const [attendedExam, setAttendedExam] = useState([]);

    useEffect(() => {
        Axios.get(`${domain}examcreatedbyuser/${user.email}`)
            .then(res => setCreatedExam(res.data));

        Axios.get(`${domain}participatedbyuser/${user.uid}`)
            .then(res => setAttendedExam(res.data));
    }, []);

    const examName = [];
    const marks = [];

    attendedExam.slice(0, 10).map(ae => {
        examName.push(ae.exam_name.substring(0, 10));
        marks.push(parseFloat(ae.currect_answer / ae.total_ques).toFixed(2) * 100);
    });

    const data = {
        labels: examName,
        datasets: [
            {
                label: 'marks(%)',
                data: marks,
                pointRadius: 1,
                fill: false,
                backgroundColor: '#1e293b',
                borderColor: 'white',
            },
        ],
    };

    const options = {
        scales: {
                yAxes: [
                {
                    ticks: {
                    beginAtZero: true,
                    },
                },
            ],
        },
    };

    const displayPicture = ['https://i.pinimg.com/564x/b7/b6/5d/b7b65d8c3ed8b5f45486e0ca3eb3bd1f.jpg', 'https://i.pinimg.com/564x/7a/77/e0/7a77e0ec6c81f5e588c6b46c864f95c2.jpg', 
                            'https://i.pinimg.com/564x/bd/5d/d7/bd5dd7757a31840758d6c2542017ef4e.jpg', 'https://i.pinimg.com/564x/b7/eb/61/b7eb6125f2ba4a4c1008276b00ff926d.jpg', 
                            'https://i.pinimg.com/564x/38/5a/bd/385abd116cae70b3c8ddf8ccee764ef0.jpg'];

                                      
    const random = Math.floor(Math.random() * displayPicture.length);

    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={displayPicture[random]} />
                    <div class="text-center lg:w-2/3 w-full">
                        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{user.displayName}</h1>
                        <h1 class="title-font sm:text-2xl text-xl mb-4 font-medium text-gray-900">{user.email}</h1>
                        <div className='w-72 mx-auto'>
                            <div class="flex justify-center mx-auto">
                                <div className="p-4 sm:w-1/2 lg:w-1/2 w-1/2">
                                <h2 className="title-font font-medium text-3xl text-gray-900">{createdExam.length}</h2>
                                <p className="leading-relaxed">Created</p>
                            </div>
                                <div className="p-4 sm:w-1/2 lg:w-1/2 w-1/2">
                                    <h2 className="title-font font-medium text-3xl text-gray-900">{attendedExam.length}</h2>
                                    <p className="leading-relaxed">Attended</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="flex flex-col text-center w-full mb-20">
                <h2 class="text-4xl text-gray-900 tracking-widest font-medium title-font mb-1">Exams Created (Last few)</h2>
            </div>

            <section class="text-gray-600 body-font">
                <div class="container px-5 py-2 pb-12 mx-auto">
                    <div class="flex flex-wrap -m-4">
                        {
                            createdExam.slice(0, 6).map(ce => {
                                return (
                                    <div class="xl:w-1/3 md:w-1/2 p-4">
                                        <div class="border border-gray-200 p-6 rounded-lg">
                                            <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-4">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <h2 class="text-lg text-gray-900 font-medium title-font mb-2">{ce.name}</h2>
                                            <p class="leading-relaxed text-base">{ce.subject}</p>
                                            <p class="leading-relaxed text-base">{dateFormatter(ce.assign_date)} - {dateFormatter(ce.last_date)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        } 
                    </div>
                </div>
            </section>

            <div class="flex flex-col text-center w-full mb-20 mt-12">
                <h2 class="text-4xl text-gray-900 tracking-widest font-medium title-font mb-1">Exams Attended (Last few)</h2>
            </div>

            <div className='p-4 flex md items-center justify-center flex-col flex-wrap container mx-auto'>
                <Bar 
                    data={data} 
                    options={options}
                    height={20}
                    width={40} />
            </div>
            
            <section class="text-gray-600 body-font">
                
                
                <div class="container px-5 py-24 mx-auto">                 
                    <div class="flex flex-wrap -mx-4 -my-8">
                        {
                            attendedExam.slice(0, 9).map(ae => {
                                const date = dateFormatter(ae.date);
                                return (
                                    <div class="py-8 px-4 lg:w-1/3">
                                        <div class="h-full flex items-start">
                                            <div class="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                                <span class="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{date.split(' ')[1].slice(0, 3)}</span>
                                                <span class="font-medium text-lg text-gray-800 title-font leading-none">{date.split(' ')[0]}</span>
                                            </div>
                                            <div class="flex-grow pl-6">
                                                <h1 class="title-font text-xl font-medium text-gray-900 mb-3">{ae.exam_name}</h1>
                                                <p class="leading-relaxed text-gray-900 mb-5">Marks: {ae.currect_answer}/{ae.total_ques}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile
