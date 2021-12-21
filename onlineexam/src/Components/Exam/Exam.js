import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import domain from "../../Domain";
import Question from './Question';
import ExamInfo from './../PrepareExam/ExamInfo';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const {exam_id} = useParams();

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
                                <Question key={ques.ques_id} props={ques} />
                            }
                        </>
                    )
                })
            }
        </>
    )
}

export default Exam
