import React from 'react'
import { useParams } from 'react-router-dom';

const Exam = () => {

    const {exam_id} = useParams();

    return (
        <>
            {
                exam_id
            }
        </>
    )
}

export default Exam
