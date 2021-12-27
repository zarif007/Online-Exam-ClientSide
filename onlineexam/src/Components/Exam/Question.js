import React, { useEffect, useState } from 'react'
import useAuth from './../../CustomHooks/useAuth';
import Axios from 'axios';
import domain from "../../Domain";
import examAvailability from '../../examAvailability';
import { Link } from 'react-router-dom';


const Question = ({ props }) => {

    const {exam_id, question, option1, option2, option3, option4, answer, ques_id} = props;

    const { user } = useAuth();

    const [userAnswer, setUserAnswer] = useState('');
    const [exam, setExam] = useState({});
    const [examIsAvailable, setExamIsAvailable] = useState(true);
    const [submitAvailable, setSubmitAvailable] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [displaySettingsMenu, setDisplaySettingsMenu] = useState(false);


    useEffect(() => {
        Axios.get(`${domain}questions/${ques_id}/${user.uid}`)
            .then(res => {
                setUserAnswer(res?.data[0]?.userAnswer || '0');
                
                setSubmitAvailable(res?.data[0]?.userAnswer === undefined);
                console.log(submitAvailable);
            });

        Axios.get(`${domain}exam/${exam_id}`)
            .then(res => setExam(res.data[0]));
    } ,[]);


    useEffect(() => {
        let last = exam?.last_date?.split('/');

        if(last !== undefined)
            setExamIsAvailable(examAvailability(last));

        if(exam.author === user.email)
            setIsAdmin(true);

    }, [exam]);


    const handleSubmit = () =>{

        setSubmitAvailable(false);

        const response = {
            exam_id,
            ques_id,
            user_id: user.uid,
            answer,
            userAnswer
        }

        Axios.post(`${domain}response`, response)
            .then(() => {});
    }



    let optionCounter = 1;

    return (
        <>
 
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="text-start mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-1">{question}</h1>
                    </div>

                    <div className="flex flex-wrap lg:w-5/5 sm:mx-auto sm:mb-2 -mx-2">
                    
                        {
                            !examIsAvailable && answer === '1' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
                        }


                        {
                            userAnswer !== '1' ? <button onClick={() => setUserAnswer('1')} className="p-2 w-full">
                                <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-900">{optionCounter++}. {option1}</span>
                                </div>
                            </button> : 
                            <button onClick={() => setUserAnswer('1')} className="p-2 w-full">
                                <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-100">{optionCounter++}. {option1}</span>
                                </div>
                            </button>
                        }

                        {
                            !examIsAvailable && answer === '2' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
                        }

                        {
                            userAnswer !== '2' ? <button onClick={() => setUserAnswer('2')} className="p-2 w-full">
                                <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-900">{optionCounter++}. {option2}</span>
                                </div>
                            </button> : 
                            <button onClick={() => setUserAnswer('2')} className="p-2 w-full">
                                <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-100">{optionCounter++}. {option2}</span>
                                </div>
                            </button>
                        }

                        {
                            !examIsAvailable && answer === '3' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
                        }

                        {
                            userAnswer !== '3' ? <button onClick={() => setUserAnswer('3')} className="p-2 w-full">
                                <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-900">{optionCounter++}. {option3}</span>
                                </div>
                            </button> : 
                            <button onClick={() => setUserAnswer('3')} className="p-2 w-full">
                                <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-100">{optionCounter++}. {option3}</span>
                                </div>
                            </button>
                        }

                        {
                            !examIsAvailable && answer === '4' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
                        }

                        {
                            userAnswer !== '4' ? <button onClick={() => setUserAnswer('4')} className="p-2 w-full">
                                <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-900">{optionCounter++}. {option4}</span>
                                </div>
                            </button> : 
                            <button onClick={() => setUserAnswer('4')} className="p-2 w-full">
                                <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                    <span className="title-font font-medium text-gray-100">{optionCounter++}. {option4}</span>
                                </div>
                            </button>
                        }
                    </div>
                    
                    
                    {
                        isAdmin && <div class="relative inline-flex p-2 text-xl container">
                            <div>
                                <button onClick={() => setDisplaySettingsMenu(!displaySettingsMenu)}><i class="fas fa-cog text-2xl text-gray-900"></i></button>
                            </div>
                            {
                                displaySettingsMenu && <div class="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                                    <div>
                                        <Link>
                                            <i class="fas fa-edit p-1" style={{color: 'blue'}}></i>
                                            <span class="mb-2 text-sm font-medium text-gray-900 pl-2">Update</span>
                                        </Link>
                                        <br />
                                        <Link>
                                            <i class="fas fa-trash-alt p-1" style={{color: 'red'}}></i>
                                            <span class="mb-2 text-sm font-medium text-gray-900 pl-2">Delete</span>
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    {
                        examIsAvailable && 
                        <>
                            {
                                submitAvailable ? <button onClick={handleSubmit} className="flex mx-auto mt-6 mb-2 text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Submit</button> :
                                <div>
                                    <p className='mt-5 m-2 text-sm font-semibold text-blueGray-600'>Submitted</p>
                                    <button className="cursor-not-allowed flex mx-auto mt-6 mb-2 text-white border-0 py-2 px-8 focus:outline-none bg-gray-800 rounded text-lg">Submit</button>
                                </div>
                            }
                        </>
                    }
                </div>
            </section>
        </>
    )
}

export default Question
