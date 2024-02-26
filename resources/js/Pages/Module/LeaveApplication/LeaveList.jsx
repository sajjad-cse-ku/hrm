import React, { Fragment, useEffect, useState } from 'react';
import MainLayout from "../../Layout/Mainlayout";
import FlashMessage from "../../Component/FlashMessage";
import { Link, usePage } from "@inertiajs/react";


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';

function LeaveList() {
    const { flash, leaveApplications } = usePage().props;

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const updatedEvents = leaveApplications.map((item, index) => ({
            id: item.id,
            title: `${item.user.first_name} ${item.user.last_name}`,
            date: item.from_date,
            start: item.from_date,
            end: item.to_date,
            reason: item.reason,
            leave_cat_name: item.leavecategory.name,
            status: item.status,
            leave_year: item.leave_year,
            color: item.status == "C" ? "#86A7FC" : item.status == "A" ? "#00b003" : item.status == "R" ? "#492E87" : item.status == "D" ? "#fc4b3c" : item.status == "E" ? "#9195F6" : item.status == "L" ? "#B80000" : item.status == "AK" ? "#ffd627" : "#FE7A36"
        }));

        setEvents(updatedEvents);
    }, []);

    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const defaultParams = { id: null, title: '', start: '', end: '', reason: '', status: '', leave_year: '', leave_cat_name: ''};
    const [params, setParams] = useState(defaultParams);

    const viewData = (data = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);

        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ? obj.id : null,
                title: obj.title ? obj.title : null,
                start: obj.start,
                end: obj.end,
                reason: obj.extendedProps.reason,
                leave_cat_name: obj.extendedProps.leave_cat_name,
                status: obj.extendedProps.status,
                leave_year: obj.extendedProps.leave_year
            });
        }

        setIsAddEventModal(true);
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
                            Leave Management
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Leave List</span>
                    </li>
                </ul>
            </div>


            {/* {
                permissions.includes('super-admin') ? ( */}
            <>

                <div className="grid xl:grid-cols-1 grid-cols-1 mt-6">
                    <div className="panel">
                        <div className="calendar-wrapper">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                                }}
                                editable={false}
                                dayMaxEvents={true}
                                selectable={false}
                                droppable={false}
                                eventClick={(event) => viewData(event)}
                                select={(event) => editDate(event)}
                                events={events}
                            />
                        </div>
                    </div>

                    {/* add event modal */}
                    <Transition appear show={isAddEventModal} as={Fragment}>
                        <Dialog as="div" onClose={() => setIsAddEventModal(false)} open={isAddEventModal} className="relative z-[51]">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enter-from="opacity-0"
                                enter-to="opacity-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100"
                                leave-to="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center px-4 py-8">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="duration-300 ease-out"
                                        enter-from="opacity-0 scale-95"
                                        enter-to="opacity-100 scale-100"
                                        leave="duration-200 ease-in"
                                        leave-from="opacity-100 scale-100"
                                        leave-to="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                                onClick={() => setIsAddEventModal(false)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                            <div className="p-5">
                                                <h1><b>Name: </b> {params.title}</h1>
                                                {/* <h1><b>Leave Year: </b> {params.leave_year}</h1> */}
                                                <h1>
                                                    Leave Applied For <b>{params.start}</b> {params.end ? <>to <b>{params.end}</b></> : null}
                                                </h1>
                                                <h1><b>Reason: </b> {params.reason}</h1>
                                                <h1><b>Leave Category: </b> {params.leave_cat_name}</h1>

                                                <h1><b>Leave Status: </b> {params.status == "C" ? "Created" : params.status == "A" ? "Approved" : params.status == "R" ? "Recommended" : params.status == "D" ? "Dismissed" : params.status == "E" ? "Enjoyed" : params.status == "L" ? "Cancel" : params.status == "AK" ? "Acknowledged" : "Cancel Acknowledged"}</h1>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>

            </>
            {/* ) : null
            } */}
        </>
    );
}
LeaveList.layout = (page) => (
    <MainLayout children={page} title="HRM || Leave List" />
);
export default LeaveList;
