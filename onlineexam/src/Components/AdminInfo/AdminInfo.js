import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import domain from "../../Domain";

const AdminInfo = ({ exam_id }) => {

    const [totalParticipants, setTotalParticipants] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [highestMark, setHighestMark] = useState(0);
    const [lowestmark, setLowestMark] = useState(0);

    useEffect(() => {
        Axios.get(`${domain}participate/${exam_id}`)
            .then(res => {
                let marks = [];

                res.data.map(rs => marks.push(parseInt(rs.currect_answer)));
                setTotalParticipants(marks.length);
                if(totalParticipants === 0){
                    setHighestMark(0);
                    setLowestMark(0);
                } else {
                    setHighestMark(Math.max(...marks));
                    setLowestMark(Math.min(...marks));
                }
            });
    }, [totalParticipants]);

    useEffect(() => {
        Axios.get(`${domain}questions/${exam_id}`)
            .then(res => setTotalQuestions(res.data.length))
    }, [])
    
    return (
        <section class="text-gray-600 body-font">
            <div class="container px-4 py-8 mx-auto">
                <div class="flex flex-wrap -m-3">
                    <div class="p-4 lg:w-1/4 w-full">
                        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center relative">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-600 mb-3">NUMBER OF PARTICIPANTS</h2>
                            <h1 class="title-font  text-5xl font-black text-gray-900 mb-1">{totalParticipants}</h1>
                            <i class="fas fa-users title-font  text-5xl font-black text-gray-900 mb-1"></i>
                        </div>
                    </div>
                    <div class="p-4 lg:w-1/4 w-full">
                        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center relative">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-600 mb-3">NUMBER OF QUESTIONS</h2>
                            <h1 class="title-font  text-5xl font-black text-gray-900 mb-1">{totalQuestions}</h1>
                            <i class="fas fa-question-circle title-font  text-5xl font-black text-gray-900 mb-1"></i>
                        </div>
                    </div>
                    <div class="p-4 lg:w-1/4 w-full">
                        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center relative">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-600 mb-3">HIGHEST MARK</h2>
                            <h1 class="title-font text-5xl font-black text-gray-900 mb-1">{highestMark}</h1>
                            <i class="fas fa-poll title-font text-5xl font-black text-gray-900 mb-1"></i>
                        </div>
                    </div>
                    <div class="p-4 lg:w-1/4 w-full">
                        <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-12 rounded-lg overflow-hidden text-center relative">
                            <h2 class="tracking-widest text-xs title-font font-medium text-gray-600 mb-3">LOWSET MARK</h2>
                            <h1 class="title-font  text-5xl font-black text-gray-900 mb-1">{lowestmark}</h1>
                            <i class="fab fa-markdown title-font text-5xl font-black text-gray-900 mb-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminInfo
