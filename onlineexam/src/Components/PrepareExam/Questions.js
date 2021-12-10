import React from 'react'

const Questions = ({props}) => {

    const {quesion, options, answer} = props;

    let vl = 1;


    return (
        <>
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="text-start mb-12">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-1">{quesion}</h1>
                </div>
                <div class="flex flex-wrap lg:w-5/5 sm:mx-auto sm:mb-2 -mx-2">
                    {
                        options.map(option => {
                            return (
                                
                                answer == vl ? 
                                <div class="p-2 w-full">
                                    <div class="border-2 border-gray-900 bg-gray-900 rounded flex p-4 h-full items-center">
                                        <span class="title-font font-medium text-gray-100">{vl++}. {option}</span>
                                    </div>
                                </div> :
                                <div class="p-2 w-full">
                                    <div class="border-2 border-gray-900 rounded flex p-4 h-full items-center">
                                        <span class="title-font font-medium text-gray-900">{vl++}. {option}</span>
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

export default Questions
