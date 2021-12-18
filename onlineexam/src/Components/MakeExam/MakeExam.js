import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

let crypto = require("crypto");


const MakeExam = () => {
    const [endDate, setEndDate] = useState(new Date());
    
    const name = useRef('');
    const subject = useRef('');

    let date = new Date();

    const history = useHistory();


    const handleSubmit = e => {
        e.preventDefault();

        let exam_id = crypto.randomBytes(8).toString('hex');

        const data = {
            name: name.current.value,
            subject: subject.current.value,
            assign_date: date.toLocaleDateString(),
            last_date: endDate.toLocaleDateString(),
            exam_id: exam_id,
        };

        console.log(data);

        history.push(`/prepare/${exam_id}`);
    }
    
    return (
        <>
            <div className="grid min-h-screen place-items-center">
                <div className="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
                    <h1 className="text-xl font-semibold">Hello there 👋, <span className="font-normal">please fill up this information to Proceed</span></h1>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <label  className="block mt-2 text-xs font-semibold text-gray-600 uppercase pt-12">Exam Name</label>
                        <input ref={name} id="name" type="name" name="name" placeholder="Exam name" className="border-2 border-gray-900  block w-full p-3 mt-2 text-gray-700  appearance-none focus:outline-none" required />
                        <div className="flex justify-between gap-3">
                            <span className="w-1/2">
                                <label  className="block text-xs font-semibold text-gray-600 uppercase pt-6">Subject</label>
                                <input ref={subject} id="firstname" type="text" name="firstname" placeholder="CSE341" className="border-2 border-gray-900 block w-full p-3 mt-2 text-gray-700  appearance-none focus:outline-none" required />
                            </span>
                            <span className="w-1/2">
                                <label className="block text-xs font-semibold text-gray-600 uppercase pt-6">Last Date</label>
                                <DatePicker className="border-2 border-gray-900  block w-full p-3 mt-2 text-gray-700  appearance-none focus:outline-none" selected={endDate} onChange={(date) => {setEndDate(date)}} />  
                            </span>
                        </div>
                        <button type="submit" className="mt-6 w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default MakeExam
