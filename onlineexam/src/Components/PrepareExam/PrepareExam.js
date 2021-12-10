import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Questions from './Questions';

let crypto = require("crypto");


const PrepareExam = () => {

    const [questions, setQuestions] = useState([]);
    const {exam_id} = useParams();

    let count = 1;

    let quesion = useRef('');
    let options1 = useRef('');
    let options2 = useRef('');
    let options3 = useRef('');
    let options4 = useRef('');
    let answer = useRef('');

    const handleSubmit = e => {
        e.preventDefault();

        let ques_id = crypto.randomBytes(8).toString('hex');

        const data = {
            exam_id, 
            ques_id,
            quesion: quesion.current.value,
            options: [
                options1.current.value,
                options2.current.value, 
                options3.current.value, 
                options4.current.value
            ],
            answer: answer.current.value
        }

        quesion.current.value = '';
        options1.current.value = '';
        options2.current.value = '';
        options3.current.value = '';
        options4.current.value = '';
        answer.current.value = '1';

        const newData = [...questions, data];

        setQuestions(newData);
    }

    return (
        <> 
            <div>
                {
                    questions.map(ques => {
                        return(
                            <>  
                                {
                                    <Questions key={ques.ques_id} props={ques} count={count}/>
                                }
                            </>
                        )
                    })
                }
                <form onSubmit={handleSubmit} className="container mx-auto form bg-white p-6 relative">
                    <h3 className="text-2xl text-gray-900 font-semibold">ADD Question</h3>
                    
                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Question</label>
                    <textarea ref={quesion} name="" id="" cols="10" rows="3" placeholder={quesion.current.value} className="border-2 border-gray-900 p-2 mt-3 w-full" required></textarea>

                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 1</label>
                    <input ref={options1} type="Options 1" name="" id="" placeholder={options1.current.value} className="border-2 border-gray-900 p-2 w-full mt-3" required/>

                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 2</label>
                    <input ref={options2} type="Options 2" name="" id="" placeholder={options2.current.value} className="border-2 border-gray-900 p-2 w-full mt-3" required/>

                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 3</label>
                    <input ref={options3} type="Options 2" name="" id="" placeholder={options3.current.value} className="border-2 border-gray-900 p-2 w-full mt-3" required/>

                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 4</label>
                    <input ref={options4} type="Options 2" name="" id="" placeholder={options4.current.value} className="border-2 border-gray-900 p-2 w-full mt-3" required/>

                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Answer</label>

                    <select id="Com" ref={answer} defaultValue='1' className="mt-2 text-base text-gray-800 outline-none border-2 border-gray-900-2 px-4 py-2 rounded-lg">
                        <option value="1">options 1</option>
                        <option value="2">options 2</option>
                        <option value="3">options 3</option>
                        <option value="4">options 4</option>
                    </select> <br />
                    
                    <button type="submit" className="mx-auto mt-9 border-2 border-gray-900 font-semibold leading-none text-white py-4 px-10 bg-gray-900 hover:border-gray-800 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">
                        ADD
                    </button>
                </form>
                <button class="flex mx-auto mt-16 mb-20 text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Finish</button>
            </div>
        </>
    )
}

export default PrepareExam
