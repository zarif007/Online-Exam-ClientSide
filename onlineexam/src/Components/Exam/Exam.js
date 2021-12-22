import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import domain from "../../Domain";
import Question from './Question';
import ExamInfo from './../PrepareExam/ExamInfo';
import { useHistory } from 'react-router-dom';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const {exam_id} = useParams();

    const history = useHistory();

    useEffect(() => {
        Axios.get(`${domain}questions/${exam_id}`,)
            .then(res => {
                setQuestions(res.data);
            });
    }, []);


    return (
        <>
            {
                <ExamInfo exam_id={exam_id}/>
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
