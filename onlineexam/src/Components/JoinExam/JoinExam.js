import React from 'react'
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios'
import domain from "../../Domain";

const JoinExam = () => {

    const exam_code = useRef('');

    const [error, setError] = useState('');

    const history = useHistory();

    const handleSubmit = e =>{
        e.preventDefault();

        Axios.get(`${domain}exam/${exam_code.current.value}`)
            .then(res => {
                if(res.data.length !== 0)
                    history.push(`/exam/${exam_code.current.value}`);
                else 
                    setError('Invalid Exam Code');
            })
        
    }

    return (
        <div className="grid min-h-screen place-items-center">
            <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                <h1 className="text-xl font-semibold">Hello there 👋, <span className="font-normal">please enter the exam code to Proceed</span></h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <label  className="block mt-2 text-xs font-semibold text-gray-600 uppercase pt-12">Exam Code</label>
                    <input ref={exam_code} id="name" type="name" name="name" placeholder="Exam Code" className="border-2 border-gray-900  block w-full p-3 mt-2 text-gray-700 mb-6  appearance-none focus:outline-none" required />
                    <p className="font-normal" style={{color: 'red'}}>{error}</p>
                    <button type="submit" className="mt-6 w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                        Proceed
                    </button>
                </form>
            </div>
        </div>
    )
}

export default JoinExam
