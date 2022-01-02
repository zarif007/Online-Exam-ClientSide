import React, { useEffect, useRef, useState } from 'react'
import useAuth from './../../CustomHooks/useAuth';
import Axios from 'axios';
import domain from "../../Domain";
import examAvailability from '../../examAvailability';
import swal from 'sweetalert';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';


const Question = ({ props }) => {


    const { user } = useAuth();
    const [fullQuestion, setFullQuestion] = useState(props);
    const [userAnswer, setUserAnswer] = useState('');
    const [exam, setExam] = useState({});
    const [examIsAvailable, setExamIsAvailable] = useState(true);
    const [submitAvailable, setSubmitAvailable] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [displaySettingsMenu, setDisplaySettingsMenu] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [displayQuestion, setDisplayQuestion] = useState(true);
    const [displayPieChart, setDisplayPieChart] = useState(false);

    const [option1OfResponse, setOption1OfResponse] = useState(0);
    const [option2OfResponse, setOption2OfResponse] = useState(0);
    const [option3OfResponse, setOption3OfResponse] = useState(0);
    const [option4OfResponse, setOption4OfResponse] = useState(0);

    const {exam_id, question, option1, option2, option3, option4, answer, ques_id} = fullQuestion;

    useEffect(() => {
        Axios.get(`${domain}questions/${ques_id}/${user.uid}`)
            .then(res => {
                setUserAnswer(res?.data[0]?.userAnswer || '0');
                
                setSubmitAvailable(res?.data[0]?.userAnswer === undefined);
            });

        Axios.get(`${domain}exam/${exam_id}`)
            .then(res => setExam(res.data[0]));

        Axios.get(`${domain}responses/${ques_id}`)
            .then(res => {
                let o1 = 0, o2 = 0, o3 = 0, o4 = 0;
                res?.data?.map(rs => {
                    if(rs.userAnswer == '1') o1++;
                    else if(rs.userAnswer == '2') o2++;
                    else if(rs.userAnswer == '3') o3++;
                    else o4++;
                });
                setOption1OfResponse(o1);
                setOption2OfResponse(o2);
                setOption3OfResponse(o3);
                setOption4OfResponse(o4);
            }); 
    } ,[]);


    useEffect(() => {
        let last = exam?.last_date?.split('/');

        if(last !== undefined)
            setExamIsAvailable(examAvailability(last));

        if(exam?.author === user.email)
            setIsAdmin(true);

    }, [exam]);


    const handleSubmit = () =>{

        setSubmitAvailable(false);

        const response = {
            exam_id,
            ques_id,
            user_id: user.uid,
            answer,
            userAnswer
        }

        Axios.post(`${domain}response`, response)
            .then(() => {});
    };

    let updatedQuestion = useRef(question);
    let updatedOption1 = useRef(option1);
    let updatedOption2 = useRef(option2);
    let updatedOption3 = useRef(option3);
    let updatedOption4 = useRef(option4);
    let updatedAnswer = useRef(answer);


    const handleUpdate = e => {
        e.preventDefault();

        const data = {
            exam_id, 
            ques_id,
            question: updatedQuestion.current.value,
            option1: updatedOption1.current.value,
            option2: updatedOption2.current.value, 
            option3: updatedOption3.current.value, 
            option4: updatedOption4.current.value,
            answer: updatedAnswer.current.value
        }

        Axios.patch(`${domain}updatequestion`, data)
            .then(() => {
                setFullQuestion(data);
                setUpdateMode(false);
                setDisplaySettingsMenu(false);
                swal({
                    title: "Updated!",
                    text: "Question Updated successfully!",
                    icon: "success",
                    button: "ok!",
                  });
            });
    };

    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            Axios.delete(`${domain}deletequestion/${ques_id}`)
            .then(() => {
                setFullQuestion({});
                setDisplayQuestion(false);
                setDisplaySettingsMenu(false);
            });
            swal("Question Deleted successfully!", {
            icon: "success",
            });
        } else {
            swal("Deletation operation dropped!");
        }
        });
    }

    const data = [
        { name: 'Group A', value: option1OfResponse },
        { name: 'Group B', value: option2OfResponse },
        { name: 'Group C', value: option3OfResponse },
        { name: 'Group D', value: option4OfResponse },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    
    let cnt = 1;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    let optionCounter = 1;

    return (
        <>
            
            {
                displayQuestion &&
                <section className="text-gray-600 body-font">
                    {   
                        (!updateMode && !displayPieChart) ?
                        <div className="container px-5 py-24 mx-auto">
                            <div className="text-start mb-12">
                                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-1">{question}</h1>
                            </div>

                            <div className="flex flex-wrap lg:w-5/5 sm:mx-auto sm:mb-2 -mx-2">
                            
                                {
                                    (!examIsAvailable || isAdmin) && answer === '1' && <i className="fas fa-check text-3xl" style={{color: 'green'}}></i>
                                }


                                {
                                    userAnswer !== '1' ? <button onClick={() => setUserAnswer('1')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-900">{optionCounter++}. {option1}</span>
                                        </div>
                                    </button> : 
                                    <button onClick={() => setUserAnswer('1')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-100">{optionCounter++}. {option1}</span>
                                        </div>
                                    </button>
                                }

                                {
                                    (!examIsAvailable || isAdmin) && answer === '2' && <i className="fas fa-check text-3xl" style={{color: 'green'}}></i>
                                }

                                {
                                    userAnswer !== '2' ? <button onClick={() => setUserAnswer('2')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-900">{optionCounter++}. {option2}</span>
                                        </div>
                                    </button> : 
                                    <button onClick={() => setUserAnswer('2')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-100">{optionCounter++}. {option2}</span>
                                        </div>
                                    </button>
                                }

                                {
                                    (!examIsAvailable || isAdmin) && answer === '3' && <i className="fas fa-check text-3xl" style={{color: 'green'}}></i>
                                }

                                {
                                    userAnswer !== '3' ? <button onClick={() => setUserAnswer('3')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-900">{optionCounter++}. {option3}</span>
                                        </div>
                                    </button> : 
                                    <button onClick={() => setUserAnswer('3')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-100">{optionCounter++}. {option3}</span>
                                        </div>
                                    </button>
                                }

                                {
                                    (!examIsAvailable || isAdmin) && answer === '4' && <i className="fas fa-check text-3xl" style={{color: 'green'}}></i>
                                }

                                {
                                    userAnswer !== '4' ? <button onClick={() => setUserAnswer('4')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-900">{optionCounter++}. {option4}</span>
                                        </div>
                                    </button> : 
                                    <button onClick={() => setUserAnswer('4')} className="p-2 w-full">
                                        <div className="border-2 border-gray-900 bg-gray-900  flex p-4 h-full items-center">
                                            <span className="title-font font-medium text-gray-100">{optionCounter++}. {option4}</span>
                                        </div>
                                    </button>
                                }
                            </div>

                            {
                                isAdmin && <div className="relative inline-flex p-2 text-xl container">
                                    <div>
                                        <button className='mr-4' onClick={() => setDisplaySettingsMenu(() => !displaySettingsMenu)}><i className="fas fa-cog text-2xl text-gray-900"></i></button>
                                    </div>
                                    <div>
                                        <button onClick={() => {
                                            setDisplayPieChart(() => !displayPieChart);
                                            setUpdateMode(false);
                                        }}><i className="fas fa-chart-pie text-2xl text-gray-900"></i></button>
                                    </div>
                                    {
                                        displaySettingsMenu && <div className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                                            <div>
                                                <button onClick={() => setUpdateMode(true)}>
                                                    <i className="fas fa-edit p-1" style={{color: 'blue'}}></i>
                                                    <span className="mb-2 text-sm font-medium text-gray-900 hover:text-gray-600 pl-2">Update</span>
                                                </button>
                                                <br />
                                                <button onClick={handleDelete}>
                                                    <i className="fas fa-trash-alt p-1" style={{color: 'red'}}></i>
                                                    <span className="mb-2 text-sm font-medium text-gray-900 hover:text-gray-600 pl-2">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }

                            {
                                examIsAvailable && 
                                <>
                                    {
                                        submitAvailable ? <button onClick={handleSubmit} className="flex mx-auto mt-6 mb-2 text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Submit</button> :
                                        <div>
                                            <p className='mt-5 m-2 text-sm font-semibold text-blueGray-600'>Submitted</p>
                                            <button className="cursor-not-allowed flex mx-auto mt-6 mb-2 text-white border-0 py-2 px-8 focus:outline-none bg-gray-800 rounded text-lg">Submit</button>
                                        </div>
                                    }
                                </>
                            }
                        </div> :
                        <>
                            {
                                updateMode? <form onSubmit={handleUpdate} className="container mx-auto form bg-white p-6 relative">
                                    <h3 className="text-2xl text-gray-900 font-semibold">ADD Questions</h3>
                                    
                                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Question</label>
                                    <textarea ref={updatedQuestion} name="" id="" cols="10" rows="3" placeholder={question} className="border-2 border-gray-900 p-2 mt-3 w-full" required>{question}</textarea>
        
                                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 1</label>
                                    <input ref={updatedOption1} type="Options 1" name="" id="" placeholder={option1} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option1} required />
        
                                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 2</label>
                                    <input ref={updatedOption2} type="Options 2" name="" id="" placeholder={option2} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option2} required />
        
                                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 3</label>
                                    <input ref={updatedOption3} type="Options 3" name="" id="" placeholder={option3} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option3} required />
        
                                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Option 4</label>
                                    <input ref={updatedOption4} type="Options 4" name="" id="" placeholder={option4} className="border-2 border-gray-900 p-2 w-full mt-3" defaultValue={option4} required />
        
                                    <label  className="block text-xs font-semibold text-gray-600 uppercase pt-2">Answer</label>
        
                                    <select id="Com" ref={updatedAnswer} defaultValue={answer} className="mt-2 text-base text-gray-800 outline-none border-2 border-gray-900-2 px-4 py-2 rounded-lg">
                                        <option value="1">options 1</option>
                                        <option value="2">options 2</option>
                                        <option value="3">options 3</option>
                                        <option value="4">options 4</option>
                                    </select> <br />
                                    
                                    <div>
                                        <button type="submit" className="mr-2 mx-auto mt-9 border-2 border-gray-900 font-semibold leading-none text-white py-4 px-10 bg-gray-900 hover:border-gray-800 rounded hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:outline-none">
                                            Update
                                        </button>
                                        <button onClick={() => {
                                            setUpdateMode(false);
                                            setDisplaySettingsMenu(false);
                                        }} className="mx-auto mt-9 border-2 border-red-900 font-semibold leading-none text-white py-4 px-10 bg-red-900 hover:border-red-800 rounded hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-900 focus:outline-none">
                                            Cancel
                                        </button>
                                    </div>
                                </form> : 
                                <button onClick={() => {
                                    setDisplayPieChart(false);
                                    setUpdateMode(false)}}
                                    
                                    className="container mx-auto flex px-5 mt-2 items-center justify-center flex-col border border-2">
                                    <div className='flex flex-wrap'>
                                        <div className='p-4 md:w-1/2 flex px-5 mt-2 items-center justify-center flex-col'>
                                            <PieChart width={300} height={300}>
                                                <Pie
                                                    data={data}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderCustomizedLabel}
                                                    outerRadius={120}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </div>
                                        <div className='p-4 md:w-1/2 title-font text-lg font-medium flex px-5 mt-2 items-center justify-center flex-col'>
                                            <p style={{color: '#0088FE'}}>Option 1 {option1OfResponse}</p>
                                            <p style={{color: '#00C49F'}}>Option 2 {option2OfResponse}</p>
                                            <p style={{color: '#FFBB28'}}>Option 3 {option3OfResponse}</p>
                                            <p style={{color: '#FF8042'}}>Option 4 {option4OfResponse}</p>
                                        </div>
                                    </div>
                                </button>
                            }
                        </>
                    }
                </section>
            }       
        </>
    )
}

export default Question
