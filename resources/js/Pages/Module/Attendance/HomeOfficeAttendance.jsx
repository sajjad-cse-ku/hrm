import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";
import axios from "axios";
import Select from "react-select";

function Index() {
    const { base_url, flash , break_times} = usePage().props;

    const [isBreakTimes,setBreakTimes] = useState(break_times);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        const storedComment = localStorage.getItem('comment');

        if (storedStartTime) {
            setStartTime(new Date(storedStartTime));
            setComment(storedComment);
            setIsTimerRunning(true);
        }
    }, []);


    useEffect(() => {
        let timerInterval;

        if (isTimerRunning) {
            timerInterval = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000);
        } else {
            clearInterval(timerInterval);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [isTimerRunning, startTime]);

    const handleTimerClick = () => {
        if (isTimerRunning) {
            const endTime = new Date();
            setEndTime(endTime);
            setIsTimerRunning(false);
            localStorage.setItem('endTime', endTime);
            saveBreakTime(comment);
        } else {
            const startTime = new Date();
            setStartTime(startTime);
            setIsTimerRunning(true);
            localStorage.setItem('startTime', startTime);
            localStorage.setItem('comment', comment);
            saveBreakTime();
        }
    };

    const saveBreakTime = async (comment = '') => {

        if(comment !== ''){
            try {
                const data = {
                    comment
                };
                const response = await axios.post('/admin/home-office-attendance/save', data);
                setBreakTimes(response.data)
                localStorage.removeItem('startTime');
                localStorage.removeItem('endTime');
                localStorage.removeItem('comment');
                setComment('');
            } catch (error) {
                setError(error.response.data.message);
            }
        }else{
            try {
                const response = await axios.post('/admin/home-office-attendance/save');
                setBreakTimes(response.data)
            } catch (error) {
                setError(error.response.data.message);
            }
        }

    };

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <>
            <FlashMessage flash={flash} />

            <div className="mb-5 panel mt-6 flex flex-wrap items-center justify-between overflow-x-auto whitespace-nowrap p-3 ">

                <ul className="flex w-full space-x-2 rtl:space-x-reverse md:w-2/3">
                    <li className="text-red-600 hover:underline">
                        <b><span className="text-[18px]">Check any previous days attendance</span></b>
                    </li>
                </ul>
                <div className="md:w-1/3 ">
                    <Link href={`${base_url}/admin/home-office-attendance`} className="px-7 py-2 rounded-md btn-gradient  w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] bg-indigo-500 text-white font-bold">Give Attendance</Link>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex flex-wrap justify-between items-start mb-5">
                    <div className="panel basis-[40%]">
                        <div className="mb-5">

                            <ul className=" flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">

                                <li className="items-center gap-2">


                                    <div className="rounded-full flex items-center justify-center">
                                        {isTimerRunning && <p className="py-1 px-2 bg-danger h-[120px] w-[120px] rounded-full flex items-center justify-center text-white font-bold">{formatTime(elapsedTime)}</p>}
                                    </div>
                                    <div>
                                        {isTimerRunning && (
                                            <textarea
                                                className="form-input mt-5 mr-auto"
                                                placeholder="Add a comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            >
                                            </textarea>

                                        )}
                                        {error.comment && (
                                            <span className="text-red-600 text-[14px]">
                                                {error.comment.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)] bg-indigo-500 text-white">
                                        <button onClick={handleTimerClick} className="" disabled={isTimerRunning && comment.trim() === ''}>
                                            {isTimerRunning ? 'Stop Break' : 'Start Break'}
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="basis-[59%]">
                        <div className="panel">

                            <div className="table-responsive mb-5">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Reason</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {isBreakTimes?.map((data,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data?.start_date}</td>
                                                <td>{data?.comment}</td>
                                                <td>{data?.start_time}</td>
                                                <td>{data?.end_time}</td>
                                                <td>{data?.duration}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || Leave Application" />
);
export default Index;
