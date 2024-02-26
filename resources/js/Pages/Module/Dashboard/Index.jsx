import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";

import { themeConfig } from "../../Store/ThemeConfig";
import FlashMessage from "../../Component/FlashMessage";
import { Link, router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import Select from 'react-select';

function Index() {
    const { flash, base_url, notices, leaveacknowledge, leavereport, leaveapprove, active_users, total_users, departments, permissions } = usePage().props;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const isRtl = themeConfig.rtlClass === "rtl" ? true : false;

    const [values, setValues] = useState({
        get_attendance: "",
    });


    const options = [
        { value: 'all', label: 'All' },
        ...departments.map((item) => ({
            value: item?.id,
            label: item?.name
                ? `${item.name}`
                : '',
        })),
        // Add a custom option
    ];

    const handleSelectChange = (selectedOption) => {
        const get_attendance = selectedOption ? selectedOption.value : ''; // Extract get_attendance
        setValues((prevValues) => ({
            ...prevValues,
            get_attendance,
        }));
    };

    function onSubmit() {
        const data = {
            get_attendance: values.get_attendance,
        };
        router.get("/admin/attendance/report", data);
    }

    // function onSubmit(data) {
    //     router.get("/admin/attendance/report", data);
    // }
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
                            Dashboard
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                    {permissions.includes('super-admin') ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            <div className="panel h-full">
                                <div className="flex justify-between dark:text-white-light mb-5">
                                    <h5 className="font-semibold text-lg ">Today Attendance</h5>
                                </div>
                                <div className=" text-[#e95f2b] text-3xl font-bold my-5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[21px]">{active_users}</span>
                                        <span className="text-black text-sm dark:text-white-light">
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="w-full rounded-full h-5 p-1 bg-dark-light overflow-hidden shadow-3xl dark:shadow-none dark:bg-dark-light/10">
                                        <div
                                            className="bg-gradient-to-r from-[#4361ee] to-[#805dca] w-full h-full rounded-full relative before:absolute before:inset-y-0 ltr:before:right-0.5 rtl:before:left-0.5 before:bg-white before:w-2 before:h-2 before:rounded-full before:m-auto"
                                            style={{ width: `${Math.ceil((active_users / total_users) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">
                                        {Math.ceil((active_users / total_users) * 100)}%
                                    </span>
                                </div>
                                <Link href={`${base_url}/admin/today-attendance`} className="w-fit btn btn-primary !mt-6 ml-auto">visit</Link>
                            </div>

                            <div className="panel h-full">
                                <div className="flex justify-between dark:text-white-light">
                                    <h5 className="font-semibold text-lg ">Leave Calendar</h5>
                                </div>
                                <div className="flex items-center justify-center" style={{ height: 'calc(100% - 28px)' }}>
                                    <Link href={`${base_url}/admin/leave-list`} className="w-fit btn btn-outline-primary">View</Link>
                                </div>
                            </div>
                        </div>
                    ) : null
                    }
                    {permissions.includes('dashboard') || permissions.includes('super-admin') ? (
                        <div>
                            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} method="post" >
                                <div className="panel" id="forms_grid">
                                    {/*Employee credentials*/}
                                    <div className="flex items-center justify-between mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">
                                            Employee Report
                                        </h5>
                                    </div>
                                    <div className="mb-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                            <div>
                                                <label>
                                                    Get Attendance
                                                </label>
                                                {/* <select
                                                        className="form-select text-white-dark"
                                                        {...register("get_attendance")}
                                                        defaultValue="all"
                                                    >
                                                        <option value="all">All</option>
                                                        {departments.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select> */}

                                                <Select placeholder="Select an option"
                                                    options={options}
                                                    value={options.find((option) => option.value === values.get_attendance)}

                                                    onChange={handleSelectChange}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary !mt-6 ml-auto"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : null
                    }
                </div>
            </div>
            {permissions.includes('dashboard-notice-view') || permissions.includes('dashboard') || permissions.includes('super-admin') ? (
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    {notices && notices.length > 0 && (
                        <div className="panel h-full w-full">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Recent Notice</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Notice Date</th>
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">Title</th>
                                            <th className="ltr:rounded-r-md rtl:rounded-l-md">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notices?.map((data, index) => (
                                            <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="text-primary">{data?.notice_date}</td>
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex items-center">
                                                        <span className="whitespace-nowrap">{data?.title}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Link href={`${base_url}/admin/notice/view/` + data.id} method="get" className="btn btn-sm btn-outline-primary">
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {leaveacknowledge && leaveacknowledge.length > 0 && (
                        <div className="panel h-full w-full">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Leave Acknowledge</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr className="border-b-0">
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">Name</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Nods</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaveacknowledge.map((data, index) => (
                                            <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex">
                                                        <p className="whitespace-nowrap">
                                                            {data.user?.first_name} {data.user?.last_name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>{data.from_date}</td>
                                                <td>{data.to_date}</td>
                                                <td>{data.nods}</td>
                                                <td>
                                                    <Link href={`${base_url}/admin/leave_application/leave-acknowledge`} className="text-danger flex items-center">
                                                        <svg className="w-3.5 h-3.5 rtl:rotate-180 ltr:mr-1 rtl:ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.6644 5.47875L16.6367 9.00968C18.2053 10.404 18.9896 11.1012 18.9896 11.9993C18.9896 12.8975 18.2053 13.5946 16.6367 14.989L12.6644 18.5199C11.9484 19.1563 11.5903 19.4746 11.2952 19.342C11 19.2095 11 18.7305 11 17.7725V15.4279C7.4 15.4279 3.5 17.1422 2 19.9993C2 10.8565 7.33333 8.57075 11 8.57075V6.22616C11 5.26817 11 4.78917 11.2952 4.65662C11.5903 4.52407 11.9484 4.8423 12.6644 5.47875Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                opacity="0.5"
                                                                d="M15.5386 4.5L20.7548 9.34362C21.5489 10.081 22.0001 11.1158 22.0001 12.1994C22.0001 13.3418 21.4989 14.4266 20.629 15.1671L15.5386 19.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        Direct
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {leavereport && leavereport.length > 0 && (

                        <div className="panel h-full w-full">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Leave Report To</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr className="border-b-0">
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">Name</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Nods</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leavereport?.map((data, index) => (
                                            <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex">
                                                        <p className="whitespace-nowrap">
                                                            {data?.user?.first_name} {data?.user?.last_name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>{data?.from_date}</td>
                                                <td>{data?.to_date}</td>
                                                <td>{data?.nods}</td>
                                                <td>
                                                    <Link href={`${base_url}/admin/leave_application/leave-report-to`} className="text-danger flex items-center" >
                                                        <svg className="w-3.5 h-3.5 rtl:rotate-180 ltr:mr-1 rtl:ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.6644 5.47875L16.6367 9.00968C18.2053 10.404 18.9896 11.1012 18.9896 11.9993C18.9896 12.8975 18.2053 13.5946 16.6367 14.989L12.6644 18.5199C11.9484 19.1563 11.5903 19.4746 11.2952 19.342C11 19.2095 11 18.7305 11 17.7725V15.4279C7.4 15.4279 3.5 17.1422 2 19.9993C2 10.8565 7.33333 8.57075 11 8.57075V6.22616C11 5.26817 11 4.78917 11.2952 4.65662C11.5903 4.52407 11.9484 4.8423 12.6644 5.47875Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                opacity="0.5"
                                                                d="M15.5386 4.5L20.7548 9.34362C21.5489 10.081 22.0001 11.1158 22.0001 12.1994C22.0001 13.3418 21.4989 14.4266 20.629 15.1671L15.5386 19.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        Direct
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {leaveapprove && leaveapprove.length > 0 && (
                        <div className="panel h-full w-full">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Leave Approved</h5>
                            </div>
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr className="border-b-0">
                                            <th className="ltr:rounded-l-md rtl:rounded-r-md">Name</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Nods</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaveapprove?.map((data, index) => (
                                            <tr key={index} className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="min-w-[150px] text-black dark:text-white">
                                                    <div className="flex">
                                                        <p className="whitespace-nowrap">
                                                            {data?.user?.first_name} {data?.user?.last_name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>{data?.from_date}</td>
                                                <td>{data?.to_date}</td>
                                                <td>{data?.nods}</td>
                                                <td>
                                                    <Link href={`${base_url}/admin/leave_application/requested-user`} className="text-danger flex items-center" >
                                                        <svg className="w-3.5 h-3.5 rtl:rotate-180 ltr:mr-1 rtl:ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12.6644 5.47875L16.6367 9.00968C18.2053 10.404 18.9896 11.1012 18.9896 11.9993C18.9896 12.8975 18.2053 13.5946 16.6367 14.989L12.6644 18.5199C11.9484 19.1563 11.5903 19.4746 11.2952 19.342C11 19.2095 11 18.7305 11 17.7725V15.4279C7.4 15.4279 3.5 17.1422 2 19.9993C2 10.8565 7.33333 8.57075 11 8.57075V6.22616C11 5.26817 11 4.78917 11.2952 4.65662C11.5903 4.52407 11.9484 4.8423 12.6644 5.47875Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                opacity="0.5"
                                                                d="M15.5386 4.5L20.7548 9.34362C21.5489 10.081 22.0001 11.1158 22.0001 12.1994C22.0001 13.3418 21.4989 14.4266 20.629 15.1671L15.5386 19.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        Direct
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ) : null
            }
        </>
    );
}

Index.layout = (page) => <MainLayout children={page} title="HR || Admin Dashboard" />;

export default Index;
