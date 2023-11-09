import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";
import axios from "axios";
import HtmlReactParser from "html-react-parser";

function ApplyList() {
    const { base_url, flash ,results } = usePage().props;


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
                            Late Apply List
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>
            <div className="grid xl:grid-cols-1 grid-cols-1 mt-6">
                <div className="panel">

                    <div className="table-responsive mb-5">

                        <table>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results?.map((data) => {
                                return (
                                    <tr>
                                        <td>{data?.late_date}</td>
                                        <td>{data?.subject}</td>
                                        <td>{data?.message && HtmlReactParser(data.message)}</td>
                                        <td>
                                            { data?.status === 0 &&
                                                <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Pending</span>
                                            }
                                            { data?.status === 1 &&
                                                <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Approved</span>
                                            }
                                            { data?.status === 2 &&
                                                <span className="badge bg-danger shadow-md dark:group-hover:bg-transparent">Cancel</span>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
ApplyList.layout = (page) => (
    <MainLayout children={page} title="HR || Apply List" />
);
export default ApplyList;
