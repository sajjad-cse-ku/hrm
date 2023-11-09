import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import FlashMessage from "../../Component/FlashMessage";
import {Link, usePage} from "@inertiajs/react";
import HtmlReactParser from "html-react-parser";
import axios from "axios";

function TodayAttendance() {
    const { flash , results,general_time } = usePage().props;

    const [isTadayAttendance , setTodayAttendance] = useState(results)
    const formatTime = (timeString) => {
        // Parse the input time string into a Date object
        const time = new Date(`1970-01-01T${timeString}`);
        // Format the time as AM/PM time
        const formattedTime = time.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        return formattedTime;
      };


      const getUserAttendanceData =  async (date) => {
        try {
            const response = await axios.get('/admin/set-today-attendance/'+date);
            setTodayAttendance(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <FlashMessage flash={flash} />
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 ">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                    >
                        <path
                            d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path
                            opacity="0.5"
                            d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="#" className="text-primary hover:underline">
                            Today's Attend
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>


            <div className="mb-5 panel mt-6 flex flex-wrap items-center justify-between overflow-x-auto whitespace-nowrap p-3 ">

                    <ul className="flex w-full space-x-2 rtl:space-x-reverse basis-[35%]">
                        <li className="text-red-600 hover:underline">
                            <b><span className="text-[18px]">Check any previous days attendance</span></b>
                        </li>
                    </ul>
                    <div className="md:w-1/3 basis-[55%]">
                        <input
                                id="getDate"
                                type="date"
                                placeholder="Enter Leave Eligible"
                                className="form-input w-1/3 mr-5"
                            />

                            <Link
                                href='#'
                                className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px]"
                                onClick={(e)=>{e.preventDefault();
                                    const getDate = document.getElementById("getDate").value;
                                    getUserAttendanceData(getDate)
                                }}
                            >
                                Find Users
                            </Link>
                    </div>
                </div>

            <div className="pt-5">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Today Attendance</h5>
                        </div>
                        <div className="table-responsive custom-scroll">
                            <table>
                                <thead>
                                <tr>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Name</th>
                                    <th>Date</th>
                                    <th>Shift</th>
                                    <th>User Check In</th>
                                    <th>User Check Out</th>
                                    <th>Comment</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                </tr>
                                </thead>
                                <tbody>

                                {isTadayAttendance?.map((result,index) => (
                                    <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <div className="flex items-center">
                                                <span className="whitespace-nowrap">{result?.first_name} {result?.last_name}</span>
                                            </div>
                                        </td>
                                        <td className="text-black">{result?.attendance?.attend_date}</td>
                                        <td className="text-black">
                                            {result?.attendance?.shift ? (
                                                `${result?.attendance?.shift?.from_time} - ${result?.attendance?.shift?.to_time}`
                                            ) : `${formatTime(general_time?.from_time)} - ${formatTime(general_time?.to_time)}`}
                                        </td>

                                        <td>
                                            {result?.attendance?.entry_time ? <span className="text-green-950 font-bold">{formatTime(result?.attendance?.entry_time)}</span> : <span className="badge bg-red-800 shadow-md dark:group-hover:bg-transparent">N/A</span> }
                                        </td>

                                        <td>
                                            {result?.attendance?.exit_time ? <span className="text-green-950 font-bold">{formatTime(result?.attendance?.exit_time)}</span>: <span className="badge bg-red-800 shadow-md dark:group-hover:bg-transparent">N/A</span> }
                                        </td>
                                        {/*<td className="text-black">{result?.attendance?.manual_update_remarks}</td>*/}
                                        <td className="text-black">
                                            {result?.attendance?.manual_update_remarks && (
                                                HtmlReactParser(result.attendance.manual_update_remarks)
                                            )}
                                        </td>
                                        <td>
                                            {result?.attendance?.holiday_flag === 1 && result?.attendance?.attendance_datetime === null &&(
                                                <span className="badge bg-indigo-700 shadow-md dark:group-hover:bg-transparent">Public Holiday</span>
                                            )}

                                            {result?.attendance?.leave_id !==0 && result?.attendance?.holiday_flag === 0 && (
                                                <span className="badge bg-indigo-600 shadow-md dark:group-hover:bg-transparent">
                                                    {result?.attendance?.leave?.name} Leave
                                              </span>
                                            )}

                                            {result?.attendance?.holiday_flag === 0 && result?.attendance?.offday_flag === 1 && result?.attendance?.attendance_datetime === null &&(
                                                <span className="badge bg-indigo-800 shadow-md dark:group-hover:bg-transparent">Off Day</span>
                                            )}
                                            {result?.attendance?.late_flag === 1 && result?.attendance?.attendance_datetime !== null &&(
                                                <span className="badge bg-yellow-400 shadow-md dark:group-hover:bg-transparent">
                                                    Late
                                                </span>
                                            )}
                                            {result?.attendance?.leave_id === 0 && result?.attendance?.late_flag === 0 && result?.attendance?.attendance_datetime && (
                                                <span className={`badge ${ result?.attendance?.attend_status === "R" ? "bg-indigo-800" : "bg-emerald-800"} shadow-md dark:group-hover:bg-transparent`}>{result?.attendance?.attend_status === "R" ? "Remote" : "Present"}</span>
                                            )}
                                            {result?.attendance?.attendance_datetime == null && result?.attendance?.leave_id === 0 && result?.attendance?.holiday_flag === 0  && result?.attendance?.offday_flag === 0 && (
                                                <span className="badge bg-red-600 shadow-md dark:group-hover:bg-transparent">Absent</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
TodayAttendance.layout = (page) => (
    <MainLayout children={page} title="HR || Group Of Company" />
);
export default TodayAttendance;

