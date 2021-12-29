import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import domain from "../../Domain";
import Question from './Question';
import { useHistory } from 'react-router-dom';
import useAuth from './../../CustomHooks/useAuth';
import examAvailability from '../../examAvailability';
import ExamInfo from '../ExamInfo/ExamInfo';
import AdminInfo from '../AdminInfo/AdminInfo';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [exam, setExam] = useState({});
    const [examIsAvailable, setExamIsAvailable] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
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
        let last = exam?.last_date?.split('/');

        if(last !== undefined){
            Axios.get(`${domain}participate/${exam_id}/${user.uid}`)
                .then(res => setExamIsAvailable(res.data.length === 0 && examAvailability(last)));
        }

        if(exam.author === user.email)
            setIsAdmin(true);

    }, [exam]);


    return (
        <>
            
            {
                examIsAvailable === true ? <div class="xl:w-1/1 md:w-1/1 w-full p-4 mx-auto container">
                    <div class="border border-gray-600 p-6">
                        <h2 class="text-5xl text-center text-gray-900 font-medium title-font mb-2">Exam On Going</h2>
                        {
                            isAdmin ? <p class="text-center text-xl text-gray-800 font-bold pt-4">Admin Access</p> :
                            <p class="text-center text-gray-500 font-medium pt-4">Examinee: {user.email}</p>
                        }
                        
                    </div>
                </div> :
                <div class="xl:w-1/1 md:w-1/1 w-full p-4 mx-auto container">
                    <div class="border border-gray-600 p-6">
                        <h2 class="text-5xl text-center text-gray-900 font-medium title-font mb-2">Exam is Over</h2>
                    </div>
                </div>
            }

            {
                isAdmin && <AdminInfo exam_id={exam_id} />
            }

            <ExamInfo exam={exam}/>


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

            {
                examIsAvailable ? <button onClick={() => history.push(`/grades/${exam_id}`)} type="submit" className="mt-6 w-full h-24 py-3 font-medium text-xl tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                    End exam
                </button> :
                <button onClick={() => history.push(`/grades/${exam_id}`)} type="submit" className="mt-6 w-full h-24 py-3 font-medium text-xl tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                    See Grades
                </button>
            }
        </>
    )
}

export default Exam
