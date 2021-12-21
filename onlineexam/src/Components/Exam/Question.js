import React, { useState } from 'react'


const Question = ({props}) => {

    const {question, option1, option2, option3, option4, answer} = props;

    

    const [userAnswer, setUserAnswer] = useState(0);

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
                </div>
            </section>
        </>
    )
}

export default Question
