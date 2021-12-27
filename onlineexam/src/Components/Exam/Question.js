import React, { useEffect, useRef, useState } from 'react'
import useAuth from './../../CustomHooks/useAuth';
import Axios from 'axios';
import domain from "../../Domain";
import examAvailability from '../../examAvailability';
import { Link } from 'react-router-dom';


const Question = ({ props }) => {


    const { user } = useAuth();
    const [fullQuestion, setFullQuestion] = useState(props);
    const [userAnswer, setUserAnswer] = useState('');
    const [exam, setExam] = useState({});
    const [examIsAvailable, setExamIsAvailable] = useState(true);
    const [submitAvailable, setSubmitAvailable] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [displaySettingsMenu, setDisplaySettingsMenu] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);

    const {exam_id, question, option1, option2, option3, option4, answer, ques_id} = fullQuestion;

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
    };

    let updatedQuestion = useRef(question);
    let updatedOption1 = useRef(option1);
    let updatedOption2 = useRef(option2);
    let updatedOption3 = useRef(option3);
    let updatedOption4 = useRef(option4);
    let updatedAnswer = useRef(answer);


    const handleUpdate = e => {
        e.preventDefault();


        const data = {
            exam_id, 
            ques_id,
            question: updatedQuestion.current.value,
            option1: updatedOption1.current.value,
            option2: updatedOption2.current.value, 
            option3: updatedOption3.current.value, 
            option4: updatedOption4.current.value,
            answer: updatedAnswer.current.value
        }

        Axios.patch(`${domain}updatequestion`, data)
            .then(() => {
                setFullQuestion(data);
                setUpdateMode(false);
                setDisplaySettingsMenu(false);
            });

        
    };



    let optionCounter = 1;

    return (
        <>
 
            <section className="text-gray-600 body-font">
                {   
                    !updateMode ?
                    <div className="container px-5 py-24 mx-auto">
                        <div className="text-start mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-1">{question}</h1>
                        </div>

                        <div className="flex flex-wrap lg:w-5/5 sm:mx-auto sm:mb-2 -mx-2">
                        
                            {
                                (!examIsAvailable || isAdmin) && answer === '1' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
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
                                (!examIsAvailable || isAdmin) && answer === '2' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
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
                                (!examIsAvailable || isAdmin) && answer === '3' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
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
                                (!examIsAvailable || isAdmin) && answer === '4' && <i class="fas fa-check text-3xl" style={{color: 'green'}}></i>
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
                                    <button onClick={() => setDisplaySettingsMenu(() => !displaySettingsMenu)}><i class="fas fa-cog text-2xl text-gray-900"></i></button>
                                </div>
                                {
                                    displaySettingsMenu && <div class="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                                        <div>
                                            <button onClick={() => setUpdateMode(true)}>
                                                <i class="fas fa-edit p-1" style={{color: 'blue'}}></i>
                                                <span class="mb-2 text-sm font-medium text-gray-900 hover:text-gray-600 pl-2">Update</span>
                                            </button>
                                            <br />
                                            <button>
                                                <i class="fas fa-trash-alt p-1" style={{color: 'red'}}></i>
                                                <span class="mb-2 text-sm font-medium text-gray-900 hover:text-gray-600 pl-2">Delete</span>
                                            </button>
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
                    </div> :
                    <form onSubmit={handleUpdate} className="container mx-auto form bg-white p-6 relative">
                        <h3 className="text-2xl text-gray-900 font-semibold">ADD Questions</h3>
                        
                        <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Question</label>
                        <textarea ref={updatedQuestion} name="" id="" cols="10" rows="3" placeholder={question} className="border-2 border-gray-900 p-2 mt-3 w-full" required>{question}</textarea>

                        <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 1</label>
                        <input ref={updatedOption1} type="Options 1" name="" id="" placeholder={option1} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option1} required />

                        <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 2</label>
                        <input ref={updatedOption2} type="Options 2" name="" id="" placeholder={option2} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option2} required />

                        <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 3</label>
                        <input ref={updatedOption3} type="Options 3" name="" id="" placeholder={option3} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option3} required />

                        <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 4</label>
                        <input ref={updatedOption4} type="Options 4" name="" id="" placeholder={option4} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option4} required />

                        <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Answer</label>

                        <select id="Com" ref={updatedAnswer} defaultValue={answer} className="mt-2 text-base text-gray-800 outline-none border-2 border-gray-900-2 px-4 py-2 rounded-lg">
                            <option value="1">options 1</option>
                            <option value="2">options 2</option>
                            <option value="3">options 3</option>
                            <option value="4">options 4</option>
                        </select> <br />
                        
                        <div>
                            <button type="submit" className="mr-2 mx-auto mt-9 border-2 border-gray-900 font-semibold leading-none text-white py-4 px-10 bg-gray-900 hover:border-gray-800 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">
                                Update
                            </button>
                            <button onClick={() => {
                                setUpdateMode(false);
                                setDisplaySettingsMenu(false);
                            }} className="mx-auto mt-9 border-2 border-red-900 font-semibold leading-none text-white py-4 px-10 bg-red-900 hover:border-red-800 rounded hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-900 focus:outline-none">
                                Cancel
                            </button>
                        </div>
                    </form>
                }
            </section>
        </>
    )
}

export default Question
