import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from 'react-select';


function Add() {
    const { flash,users,projects,result,errors } = usePage().props;

    const [values, setValues] = useState({
        id: result.id,
        project_id:result.project_id,
        task_creator:result.task_creator_id,
        task_title:result.task_title,
        task_link:result.task_link,
        task_approximate_start_date:result.task_approximate_start_date,
        task_approximate_end_date:result.task_approximate_end_date,
        task_priority:result.task_priority,
        task_author_comment:result.task_author_comment,
        task_assigned_user_comment:result.task_assigned_user_comment,
        task_status:"",
        task_marking:result.task_marking,
        task_remarks:result.task_remarks,
        task_total_hours:result.task_total_hours,
        task_start_date_time:result.task_start_date_time,
    });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values);
        router.post("/admin/task/update_review_task", values);
    };

    const options = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} - ${user.id}` : '',
    }));

    const project = projects.map((project) => ({
        value: project?.id,
        label: project?.name,
    }));

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
                            Task Management
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Add</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Task Assigned
                        </h5>
                    </div>
                    <div className="mb-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label>Project Name<span className="text-red-600 ">*</span></label>
                                <input
                                    className="form-input"
                                    disabled
                                    value={project.find(option => option.value === values.project_id)?.label || ''}
                                />
                                {errors.project_id && (
                                    <div className="text-red-600 text-[14px]">
                                        {errors.project_id}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>Task Title<span className="text-red-600 ">*</span></label>
                                <input
                                    id="task_title"
                                    type="text"
                                    disabled
                                    placeholder="Enter Title"
                                    className="form-input"
                                    value={values.task_title || ''}
                                    onChange={handleChange}
                                />
                                {errors.task_title && (
                                    <div className="text-red-600 text-[14px]">
                                        {errors.task_title}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>Assigned User<span className="text-red-600 ">*</span></label>
                                <input
                                    className="form-input"
                                    disabled
                                    value={options.find(user => user.value === values.task_creator)?.label || ''}
                                    // value={values.selectedAssignedUser.map((userId) => options.find((user) => user.value === userId))}
                                    // onChange={handleSelectUser}
                                />
                                {errors.selectedAssignedUser && (
                                    <div className="text-red-600 text-[14px]">
                                        {errors.selectedAssignedUser}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label>Author Description<span className="text-red-600 ">*</span></label>

                                <textarea
                                    id="task_author_comment"
                                    disabled
                                    placeholder="Enter Description"
                                    className="form-input"
                                    value={values.task_author_comment || ''}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Task Management
                        </h5>
                    </div>
                    <div className="mb-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label>Task Link<span className="text-red-600 ">*</span></label>
                                <input
                                    id="task_link"
                                    type="text"
                                    placeholder="Enter Link"
                                    disabled
                                    className="form-input"
                                    value={values.task_link || ''}
                                    onChange={handleChange}
                                />
                                {errors.task_link && (
                                    <div className="text-red-600 text-[14px]">
                                        {errors.task_link}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>Start Date Time<span className="text-red-600 ">*</span></label>
                                <input
                                    id="task_approximate_start_date"
                                    type="date"
                                    placeholder="Enter Start Date"
                                    disabled
                                    className="form-input"
                                    value={values.task_approximate_start_date || ''}
                                    onChange={handleChange}
                                />
                                {errors.task_approximate_start_date && (
                                    <div className="text-red-600 text-[14px]">
                                        {errors.task_approximate_start_date}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>End Date Time<span className="text-red-600 ">*</span></label>
                                <input
                                    id="task_approximate_end_date"
                                    type="date"
                                    disabled
                                    placeholder="Enter Start Date"
                                    className="form-input"
                                    value={values.task_approximate_end_date || ''}
                                    onChange={handleChange}
                                />
                                {errors.task_approximate_end_date && (
                                    <div className="text-red-600 text-[14px]">
                                        {errors.task_approximate_end_date}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label>Your Comment's<span className="text-red-600 ">*</span></label>

                                <textarea
                                    id="task_assigned_user_comment"
                                    placeholder="Enter Description"
                                    disabled
                                    className="form-input"
                                    value={values.task_assigned_user_comment || ''}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Task Management
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            method="post"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Review<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="task_remarks"
                                        type="text"
                                        placeholder="Enter Review"
                                        className="form-input"
                                        value={values.task_remarks || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.task_link && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.task_link}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Point<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="task_marking"
                                        type="text"
                                        placeholder="Point"
                                        className="form-input"
                                        value={values.task_marking || ''}
                                        onChange={handleChange}
                                    />
                                    {errors.task_approximate_start_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.task_approximate_start_date}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Task Status<span className="text-red-600 ">*</span></label>
                                    <select
                                        id="task_status"
                                        className="form-select text-white-dark"
                                        value={values.task_status || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="C">Assign</option>
                                        <option value="P">Processing</option>
                                        <option value="A">Approved</option>
                                    </select>
                                    {errors.task_status && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.task_status}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary !mt-6 ml-auto"
                                >
                                    {values.task_status === "C"
                                        ? "Start Task"
                                        : values.task_status === "P"
                                        ? "Submit For Review"
                                        : values.task_status === "R"
                                        ? "Complete Task"
                                        : "Submit" // Add a default message for other statuses if needed
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

Add.layout = (page) => (
    <MainLayout children={page} title="HR || Review Task" />
);

export default Add;
