import React, { useState,Fragment } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";
import { Dialog, Transition,Tab } from '@headlessui/react';
import HtmlReactParser from 'html-react-parser';
import axios from "axios";

function LateList() {
    const {flash ,results,base_url } = usePage().props;
    const [modal1, setModal] = useState(false);
    const [response, setResponse] = useState(null);
    const openModalWithId =  async (id) => {
        try {
            const responseData = await axios.get('/admin/get-late-user-data/'+id);
            if(responseData.data){
                setResponse(responseData.data);
                setModal(true)
            }
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
                            Late
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
                                <th>Name</th>
                                <th>Department</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {results?.map((result,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{result?.late_date}</td>
                                        <td>{result?.user?.first_name}</td>
                                        <td>{result?.user?.professionaldata?.department?.name}</td>
                                        <td>{result?.subject}</td>
                                        <td>
                                            { result?.status === 0 &&
                                                <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Pending</span>
                                            }
                                            { result?.status === 1 &&
                                                <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Approved</span>
                                            }
                                            { result?.status === 2 &&
                                                <span className="badge bg-danger shadow-md dark:group-hover:bg-transparent">Cancel</span>
                                            }
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-primary" onClick={() => openModalWithId(result.id)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            { response &&
                <div className="mb-5">
                <Transition appear show={modal1} as={Fragment}>
                    <Dialog as="div" open={modal1} onClose={() => setModal(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="p-5">
                                            <h6 className="text-right pb-2 mb-2"><b>Late Date: </b>{response?.late_date}</h6>
                                            <div className="border rounded-md border-grey-500">
                                                <p className="border-b p-3 border-grey-500"><b>Subject: </b>{response?.subject}</p>
                                                <p className="p-3">
                                                    {
                                                        response?.message && HtmlReactParser(response.message)
                                                    }
                                                </p>
                                            </div>

                                            <div className="flex justify-end items-center mt-5">
                                                <Link
                                                    href={`${base_url}/admin/late-declined/`+response.id}
                                                    method="get"
                                                    className="btn btn-sm btn-outline-danger ml-2"
                                                >
                                                    Declined
                                                </Link>
                                                <Link
                                                    href={`${base_url}/admin/late-approved/`+response.id}
                                                    method="get"
                                                    className="btn btn-sm btn-outline-success ml-2"
                                                >
                                                    Approved
                                                </Link>

                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            }
        </>
    );
}
LateList.layout = (page) => (
    <MainLayout children={page} title="HR || Late List" />
);
export default LateList;
