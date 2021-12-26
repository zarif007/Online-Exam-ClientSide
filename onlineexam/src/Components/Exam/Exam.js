import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import domain from "../../Domain";
import Question from './Question';
import ExamInfo from './../PrepareExam/ExamInfo';
import { useHistory } from 'react-router-dom';
import useAuth from './../../CustomHooks/useAuth';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [exam, setExam] = useState({});
    const [examIsAvailable, setExamIsAvailable] = useState(true);
    const {exam_id} = useParams();

    const history = useHistory();

    const { user } = useAuth();

    useEffect(() => {
        Axios.get(`${domain}questions/${exam_id}`,)
            .then(res => {
                setQuestions(res.data);
            });
        
        Axios.get(`${domain}exam/${exam_id}`)
            .then(res => setExam(res.data[0]));
    }, []);

    useEffect(() => {
        let assign = exam?.assign_date?.split('/');
        let last = exam?.last_date?.split('/');

        if(assign !== undefined){
            if(assign[2] === last[2]){                           // Year matching
                if(assign[0] === last[0])                        // Month matching
                    setExamIsAvailable(assign[1] <= last[1]);    // Day matching
                else   
                    setExamIsAvailable(assign[0] < last[0]);     // Month matching
            } else 
                setExamIsAvailable(assign[2] < last[2]);         // Year matching
        }
    }, [exam]);


    return (
        <>
            
            {
                examIsAvailable === true ? <div class="xl:w-1/1 md:w-1/1 w-full p-4 mx-auto container">
                    <div class="border border-gray-600 p-6">
                        <h2 class="text-5xl text-center text-gray-900 font-medium title-font mb-2">Exam On Going</h2>
                        <p class="text-center text-gray-500 font-medium pt-4">Examinee: {user.email}</p>
                    </div>
                </div> :
                <div class="xl:w-1/1 md:w-1/1 w-full p-4 mx-auto container">
                    <div class="border border-gray-600 p-6">
                        <h2 class="text-5xl text-center text-gray-900 font-medium title-font mb-2">Exam is Over</h2>
                    </div>
                </div>
            }
            {
                <ExamInfo exam={exam}/>
            }

            {
                questions.map(ques => {
                    return(
                        <>  
                            {
                                <Question key={ques.ques_id} props={ques}/>
                            }
                        </>
                    )
                })
            }

            <button onClick={() => history.push(`/grades/${exam_id}`)} type="submit" className="mt-6 w-full h-24 py-3 font-medium text-xl tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                End exam
            </button>
        </>
    )
}

export default Exam
