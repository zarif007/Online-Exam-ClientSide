import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

const PrepareExam = () => {

    const [questions, setQuestions] = useState([]);
    const {exam_id} = useParams();

    const quesion = useRef('');
    const options1 = useRef('');
    const options2 = useRef('');
    const options3 = useRef('');
    const options4 = useRef('');
    const answer = useRef('');

    const handleSubmit = e => {
        e.preventDefault();

        console.log(quesion.current.value, options1.current.value, options2.current.value, options3.current.value, options4.current.value, answer.current.value);
        
        quesion.current.value = '';
        options1.current.value = '';
        options2.current.value = '';
        options3.current.value = '';
        options4.current.value = '';
        answer.current.value = '';

    }

    return (
        <> 
            <form onSubmit={handleSubmit} class="container mx-auto form bg-white p-6 relative">
                <h3 class="text-2xl text-gray-900 font-semibold">ADD Question</h3>
                
                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Question</label>
                <textarea ref={quesion} name="" id="" cols="10" rows="3" placeholder={quesion.current.value} class="border p-2 mt-3 w-full" required></textarea>

                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 1</label>
                <input ref={options1} type="Options 1" name="" id="" placeholder={options1.current.value} class="border p-2 w-full mt-3" required/>

                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 2</label>
                <input ref={options2} type="Options 2" name="" id="" placeholder={options2.current.value} class="border p-2 w-full mt-3" required/>

                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 3</label>
                <input ref={options3} type="Options 2" name="" id="" placeholder={options3.current.value} class="border p-2 w-full mt-3" required/>

                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 4</label>
                <input ref={options4} type="Options 2" name="" id="" placeholder={options4.current.value} class="border p-2 w-full mt-3" required/>

                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Answer</label>

                <select id="Com" ref={answer} defaultValue='1' class="mt-2 text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg">
                    <option value="1">options1</option>
                    <option value="2">options2</option>
                    <option value="3">options3</option>
                    <option value="4">options4</option>
                </select> <br />
                
                <button type="submit" className="mx-auto mt-9 border-2 border-gray-900 font-semibold leading-none text-white py-4 px-10 bg-gray-900 hover:border-gray-800 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">
                    ADD
                </button>
           </form>
        </>
    )
}

export default PrepareExam
