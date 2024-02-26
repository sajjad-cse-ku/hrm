import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from 'react-select';

function Add() {
    const {  flash,users,errors } = usePage().props;

    const [values, setValues] = useState({
        attendance_date:"",
        manual_update_remarks:"",
        in_time:"",
        exit_date:"",
        out_time:"",
        user_id: "",
    });
    const handleSelectChange = (selectedOption) => {
        const user_id = selectedOption ? selectedOption.value : ''; // Extract user_id
        setValues((prevValues) => ({
            ...prevValues,
            user_id,
        }));
    };
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const options = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} - ${user.id}` : '',
    }));
    function handleSubmit(e) {
        e.preventDefault();
        router.post("/admin/manual-attendance/update", values);
        setValues({
            attendance_date:"",
            manual_update_remarks:"",
            in_time:"",
            exit_date:"",
            out_time:"",
            user_id: "",
        })

    }
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
                            Manual Attendance
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
                            Manual Attendance
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
                                    <label>Employee<span className="text-red-600 ">*</span></label>
                                    <Select placeholder="Select an option"
                                            options={options}
                                            value={options.find((option) => option.value === values.user_id)}
                                            onChange={handleSelectChange}
                                    />
                                    {errors.user_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.user_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Attendance Date<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="attendance_date"
                                        type="date"
                                        placeholder="Enter effect date"
                                        className="form-input"
                                        value={values.attendance_date}
                                        onChange={handleChange}
                                    />
                                    {errors.attendance_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.attendance_date}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Check in<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="in_time"
                                        type="time"
                                        placeholder="Enter To Time"
                                        className="form-input"
                                        value={values.in_time}
                                        onChange={handleChange}
                                    />
                                    {errors.in_time && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.in_time}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Exit Date</label>
                                    <input
                                        id="exit_date"
                                        type="date"
                                        placeholder="Enter effect date"
                                        className="form-input"
                                        value={values.exit_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Check out</label>
                                    <input
                                        id="out_time"
                                        type="time"
                                        placeholder="Enter To Time"
                                        className="form-input"
                                        value={values.out_time}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label>Description<span className="text-red-600 ">*</span></label>

                                    <textarea
                                        id="manual_update_remarks"
                                        placeholder="Enter Description"
                                        className="form-input"
                                        value={values.manual_update_remarks}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.manual_update_remarks && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.manual_update_remarks}
                                        </div>
                                    )}
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

Add.layout = (page) => (
    <MainLayout children={page} title="HR || Manual Attendance" />
);

export default Add;
