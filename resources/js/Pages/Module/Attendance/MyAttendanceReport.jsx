import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import FlashMessage from "../../Component/FlashMessage";
import {Link, usePage} from "@inertiajs/react";
import HtmlReactParser from "html-react-parser";
import axios from "axios";
import Select from "react-select";

function TodayAttendance() {
    const { flash,results,general_time,base_url } = usePage().props;

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
                <ul className="flex w-full space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="#" className="text-primary hover:underline">
                            This Month Attendance
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
                <Link href={`${base_url}/admin/home-office`}
                    className="px-7 py-2 bg-yellow-400 text-white rounded-md text-[15px]">
                    Home Office
                </Link>
            </div>



            <div className="pt-5">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">{results?.first_name} {results?.last_name}-{results?.id} <span className="text-indigo-700">{results?.professionaldata?.department?.name}</span></h5>
                        </div>
                        <div className="table-responsive custom-scroll">
                            <table>
                                <thead>
                                <tr>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Date</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Shift</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">User Check In</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">User Check Out</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Comment</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                </tr>
                                </thead>
                                <tbody>

                                    {results?.attendances?.map((result,index) => (
                                        <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                            <td className="text-black">
                                                {result?.attend_date}
                                            </td>
                                            <td className="text-black">
                                                {result?.shift ? (
                                                    `${result?.shift?.from_time} - ${result?.shift?.to_time}`
                                                ) : `${formatTime(general_time?.from_time)} - ${formatTime(general_time?.to_time)}`}
                                            </td>

                                            <td>
                                                {result?.entry_time ? <span className="text-green-950 font-bold">{formatTime(result?.entry_time)}</span> : <span className="badge bg-red-800 shadow-md dark:group-hover:bg-transparent">N/A</span> }
                                            </td>

                                            <td>
                                                {result?.exit_time ? <span className="text-green-950 font-bold">{formatTime(result?.exit_time)}</span>: <span className="badge bg-red-800 shadow-md dark:group-hover:bg-transparent">N/A</span> }
                                            </td>

                                            <td className="text-black">
                                                {result?.manual_update_remarks && (
                                                    HtmlReactParser(result.manual_update_remarks)
                                                )}
                                            </td>
                                            <td>
                                                {result?.holiday_flag === 1 && result?.attendance_datetime === null &&(
                                                    <span className="badge bg-indigo-700 shadow-md dark:group-hover:bg-transparent">Public Holiday</span>
                                                )}

                                                {result?.leave_id !==0 && result?.holiday_flag === 0 && (
                                                    <span className="badge bg-indigo-600 shadow-md dark:group-hover:bg-transparent">
                                                    {result?.leave?.name} Leave
                                              </span>
                                                )}

                                                {result?.holiday_flag === 0 && result?.offday_flag === 1 && result?.attendance_datetime === null &&(
                                                    <span className="badge bg-indigo-800 shadow-md dark:group-hover:bg-transparent">Off Day</span>
                                                )}
                                                {result?.late_flag === 1 && result?.attendance !== null &&(
                                                    <span className="badge bg-yellow-400 shadow-md dark:group-hover:bg-transparent">
                                                    Late
                                                </span>
                                                )}
                                                {result?.leave_id === 0 && result?.late_flag === 0 && result?.attendance_datetime && (
                                                    <span className={`badge ${ result?.attendance?.attend_status === "R" ? "bg-indigo-800" : "bg-emerald-800"} shadow-md dark:group-hover:bg-transparent`}>{result?.attend_status === "R" ? "Remote" : "Present"}</span>
                                                )}
                                                {result?.attendance_datetime == null && result?.leave_id === 0 && result?.holiday_flag === 0  && result?.offday_flag === 0 && (
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

