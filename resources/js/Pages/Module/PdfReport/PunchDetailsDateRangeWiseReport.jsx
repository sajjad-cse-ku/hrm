import MainLayout from "../../Layout/Mainlayout";
import {Link, usePage} from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";
import HtmlReactParser from "html-react-parser";
import React from "react";
function PunchDetailsDateRangeWiseReport() {
    const { flash , results } = usePage().props;

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
                            Punch Attendance
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>

            <div className="pt-5">
                <div className="grid lg:grid-cols-3 grid-cols-3 gap-6">
                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">{results?.first_name} {results?.last_name} - {results?.id} - {results?.professionaldata?.department?.name} - {results?.professionaldata?.designation?.name}</h5>
                        </div>
                        <div className="table-responsive custom-scroll">
                            <table>
                                <thead>
                                <tr>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Attend Date</th>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Time</th>
                                </tr>
                                </thead>
                                <tbody>

                                {results?.punches?.map((data,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="whitespace-nowrap">{new Date(data?.attendance_datetime).toISOString().split('T')[0]}</div>
                                            </td>
                                            <td>
                                                <div className="whitespace-nowrap">{new Date(data?.attendance_datetime).toLocaleTimeString()}</div>
                                            </td>
                                        </tr>

                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
PunchDetailsDateRangeWiseReport.layout = (page) => (
    <MainLayout children={page} title="HR || Notice" />
);
export default PunchDetailsDateRangeWiseReport;
