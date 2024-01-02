import React from "react";
import MainLayout from "../../Layout/Mainlayout";
import "tippy.js/dist/tippy.css";
import { Link, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";
import 'tippy.js/dist/tippy.css';



function Index() {
    const { flash,currentMonthAttendance,base_url } = usePage().props;
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dayNamesArray = daysArray.map(day => {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);
        // console.log(date)
        return date.toLocaleDateString('en-US', { weekday: 'short' }); // Adjust locale as needed
    });
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
                            Attendance Report
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>
            <div className="mt-5">
                <div className="grid xl:grid-cols-1 grid-cols-1">
                    <div className="panel">

                        <div className="attendance-report-table table-responsive mb-5">
                            <table>
                                <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    {daysArray.map((day, index) => (
                                        <th key={index}>
                                            day-{day} {/* Display the day number */}
                                            {dayNamesArray[index]}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {currentMonthAttendance.map((attend, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="font-bold">
                                            <Link href={`${base_url}/admin/my-attendance-report/${attend?.id}`} className="hover:text-red-600">
                                                {attend?.username}-{attend?.id}
                                                <br />
                                                <span className="text-indigo-700 ">{attend?.designation}</span>
                                            </Link>

                                        </td>
                                        {attend.getAttendance.map((day, dayIndex) => {
                                            // console.log(day.status)
                                            let statusBadge;
                                            if (day.status === 'Late') {
                                                statusBadge = (
                                                    <p key={dayIndex} className={`inline-block badge whitespace-nowrap bg-yellow-500 text-center`}>
                                                        <b>{day.status}</b>
                                                        <br/>
                                                        {day?.intime ? day?.intime : ""} - {day?.exittime ? day?.exittime : ""}
                                                    </p>
                                                );
                                            } else if (day.status === 'Present' || day.status === 'Remote') {

                                                statusBadge = (
                                                    <p key={dayIndex} className={`inline-block badge whitespace-nowrap text-center ${day.status === 'Remote'? "bg-purple-700" : "bg-green-700"}`} >
                                                        <b>{day.status}</b>
                                                        <br/>
                                                        {day?.intime ? day?.intime : ""} - {day?.exittime ? day?.exittime : ""}
                                                    </p>
                                                );
                                            } else if (day.status === 'Upcomming') {
                                                statusBadge = ''
                                            }else if (day.status === 'Pass Day') {
                                                statusBadge = (
                                                    <p key={dayIndex} className="inline-block badge whitespace-nowrap bg-black">
                                                        {day.status}
                                                    </p>
                                                );
                                            }
                                            else if (day.status === 'Absent') {
                                                statusBadge = (
                                                    <p key={dayIndex} className="inline-block badge whitespace-nowrap bg-red-700">
                                                        {day.status}
                                                    </p>
                                                );
                                            }
                                            else if (day.status === 'Off Day') {
                                                statusBadge = (
                                                    <p key={dayIndex} className="inline-block badge whitespace-nowrap bg-indigo-700">
                                                        {day.status}
                                                    </p>
                                                );
                                            }
                                            else if (day.status === 'Public Holiday') {
                                                statusBadge = (
                                                    <p key={dayIndex} className="inline-block badge whitespace-nowrap bg-blue-700">
                                                        {day.status}
                                                    </p>
                                                );
                                            }
                                            else if (day.status === 'Leave') {
                                                statusBadge = (
                                                    <p key={dayIndex} className="inline-block badge whitespace-nowrap bg-orange-700">
                                                        {day.status}
                                                    </p>
                                                );
                                            }
                                            else {
                                                statusBadge = (
                                                    <p key={dayIndex} className="inline-block badge whitespace-nowrap badge-outline-warning">
                                                        {day.status}&nbsp;
                                                        {day?.intime ? day?.intime : ""} - {day?.exittime ? day?.exittime : ""}
                                                    </p>
                                                );
                                            }

                                            return <td key={dayIndex}>{statusBadge}</td>;
                                        })}

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*Modalss=====================*/}
        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || Attendance Report" />
);
export default Index;
