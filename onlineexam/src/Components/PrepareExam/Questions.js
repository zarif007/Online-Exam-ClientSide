import React from 'react'

const Question = ({props}) => {

    const {question, option1, option2, option3, option4, answer} = props;

    let options = [option1, option2, option3, option4];

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
                        options.map(option => {
                            return (
                                parseInt(answer) === optionCounter ? 
                                <div className="p-2 w-full">
                                    <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                        <span className="title-font font-medium text-gray-100">{optionCounter++}. {option}</span>
                                    </div>
                                </div> :
                                <div className="p-2 w-full">
                                    <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                        <span className="title-font font-medium text-gray-900">{optionCounter++}. {option}</span>
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

export default Question
