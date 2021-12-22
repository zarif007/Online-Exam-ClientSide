import React, { useState } from 'react'
import useAuth from './../../CustomHooks/useAuth';


const Question = ({props}) => {

    const {question, option1, option2, option3, option4, answer, ques_id} = props;

    const { user } = useAuth();

    const [userAnswer, setUserAnswer] = useState(0);
    const [submitAvialble, setSubmitAvialble] = useState(true);

    const handleSubmit = () =>{

        setSubmitAvialble(false);

        const response = {
            ques_id,
            user_id: user.uid,
            answer,
            userAnswer
        }

        console.log(response)

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
                        userAnswer !== 1 ? <button onClick={() => setUserAnswer(1)} className="p-2 w-full">
                            <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-900">{optionCounter++}. {option1}</span>
                            </div>
                        </button> : 
                        <button onClick={() => setUserAnswer(1)} className="p-2 w-full">
                            <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-100">{optionCounter++}. {option1}</span>
                            </div>
                        </button>
                    }

                    {
                        userAnswer !== 2 ? <button onClick={() => setUserAnswer(2)} className="p-2 w-full">
                            <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-900">{optionCounter++}. {option2}</span>
                            </div>
                        </button> : 
                        <button onClick={() => setUserAnswer(2)} className="p-2 w-full">
                            <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-100">{optionCounter++}. {option2}</span>
                            </div>
                        </button>
                    }

                    {
                        userAnswer !== 3 ? <button onClick={() => setUserAnswer(3)} className="p-2 w-full">
                            <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-900">{optionCounter++}. {option3}</span>
                            </div>
                        </button> : 
                        <button onClick={() => setUserAnswer(3)} className="p-2 w-full">
                            <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-100">{optionCounter++}. {option3}</span>
                            </div>
                        </button>
                    }

                    {
                        userAnswer !== 4 ? <button onClick={() => setUserAnswer(4)} className="p-2 w-full">
                            <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-900">{optionCounter++}. {option4}</span>
                            </div>
                        </button> : 
                        <button onClick={() => setUserAnswer(4)} className="p-2 w-full">
                            <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                <span className="title-font font-medium text-gray-100">{optionCounter++}. {option4}</span>
                            </div>
                        </button>
                    }
                    
                    
                    </div>
                    {
                        submitAvialble ? <button onClick={handleSubmit} className="flex mx-auto mt-6 mb-2 text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Submit</button> :
                        <div>
                            <p className='mt-5 m-2 text-sm font-semibold text-blueGray-600'>Submitted</p>
                            <button className="cursor-not-allowed flex mx-auto mt-6 mb-2 text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Submit</button>
                        </div>
                    }
                    
                </div>
            </section>
        </>
    )
}

export default Question
