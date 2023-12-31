import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import FlashMessage from "../../Component/FlashMessage";
import { Link, usePage } from "@inertiajs/react";
import HtmlReactParser from "html-react-parser";
import axios from "axios";

function MyTask() {
    const { base_url, flash, tasks, auth } = usePage().props;
    const [isTask, setTask] = useState(tasks);
    const [isTitle, setTitle] = useState("Assigned Task");

    const createdTask = async () => {
        try {
            const response = await axios.get("/admin/task/get-created-myTask/");
            setTask(response.data);
            setTitle("Created Task");
        } catch (error) {
            console.error(error);
        }
    };

    const processingTask = async () => {
        try {
            const response = await axios.get(
                "/admin/task/get-processing-myTask/"
            );
            // console.log(response.data)
            setTask(response.data);
            setTitle("Processing Task");
        } catch (error) {
            console.error(error);
        }
    };

    const reviewTask = async () => {
        try {
            const response = await axios.get("/admin/task/get-review-myTask/");
            setTask(response.data);
            setTitle("Review Task");
        } catch (error) {
            console.error(error);
        }
    };

    const doneTask = async () => {
        try {
            const response = await axios.get("/admin/task/get-done-myTask/");
            setTask(response.data);
            setTitle("Approved Task");
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
                            My Task
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>

            <div className="mb-5 panel mt-6 flex flex-wrap items-center justify-between overflow-x-auto whitespace-nowrap p-3 gap-2">
                <div className="">
                    <button
                        className="px-7 py-2 bg-yellow-600 text-white rounded-md text-[15px]"
                        onClick={createdTask}
                    >
                        Assigned Task
                    </button>
                    <button
                        className="px-7 py-2 bg-red-600 text-white rounded-md text-[15px] ml-2"
                        onClick={processingTask}
                    >
                        Processing
                    </button>
                    <button
                        className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px] ml-2"
                        onClick={reviewTask}
                    >
                        Review
                    </button>
                    <button
                        className="px-7 py-2 bg-green-600 text-white rounded-md text-[15px] ml-2"
                        onClick={doneTask}
                    >
                        Done
                    </button>
                </div>
                <div className="">
                    <Link href={`${base_url}/admin/task/create`} method="get">
                        <button
                            className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px] "
                            onClick={doneTask}
                        >
                            Create Task
                        </button>
                    </Link>
                </div>
            </div>

            <div className="pt-5">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                {isTitle}
                            </h5>
                        </div>
                        <div className="table-responsive custom-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Project name</th>
                                        <th>Task Title</th>
                                        <th>priority</th>
                                        <th>Time Duration</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isTask &&
                                        isTask.length > 0 &&
                                        isTask?.map((task, index) => (
                                            <tr
                                                key={index}
                                                className="text-white-dark hover:text-black dark:hover:text-white-light/90 group"
                                            >
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex items-center">
                                                        <span className="whitespace-nowrap">
                                                            {
                                                                task?.project
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex items-center">
                                                        <span className="whitespace-nowrap">
                                                            {task?.task_title}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex items-center">
                                                        <span className="whitespace-nowrap">
                                                            {
                                                                task?.task_priority
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    {task.task_status ===
                                                    "C" ? (
                                                        <span className="whitespace-nowrap">
                                                            Assigned
                                                        </span>
                                                    ) : task.task_status ===
                                                      "P" ? (
                                                        <div className="flex items-center">
                                                            <span className="whitespace-nowrap">
                                                                Start at :-{" "}
                                                                {
                                                                    task?.task_start_date_time
                                                                }
                                                            </span>
                                                        </div>
                                                    ) : task.task_status ===
                                                          "R" ||
                                                      task.task_status ===
                                                          "A" ? (
                                                        <div className="flex items-center">
                                                            <span className="whitespace-nowrap">
                                                                {
                                                                    task?.task_total_hours
                                                                }
                                                            </span>
                                                        </div>
                                                    ) : null}
                                                </td>
                                                <td>
                                                    {task.task_status === "C" ||
                                                    task.task_status === "P" ? (
                                                        <Link
                                                            href={
                                                                `${base_url}/admin/task/view_my_task/` +
                                                                task.id
                                                            }
                                                            method="get"
                                                            className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px] ml-2"
                                                        >
                                                            View
                                                        </Link>
                                                    ) : task.task_status ===
                                                      "R" ? (
                                                        task?.task_creator_id ===
                                                        auth.id ? (
                                                            <Link
                                                                href={
                                                                    `${base_url}/admin/task/view_my_task/` +
                                                                    task.id
                                                                }
                                                                method="get"
                                                                className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px] ml-2"
                                                            >
                                                                View
                                                            </Link>
                                                        ) : (
                                                            <div className="text-primary">
                                                                Under Review
                                                            </div>
                                                        )
                                                    ) : task.task_status ===
                                                      "A" ? (
                                                        <div className="text-success">
                                                            Complete
                                                        </div>
                                                    ) : null}
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
MyTask.layout = (page) => <MainLayout children={page} title="HR || My Task" />;
export default MyTask;
