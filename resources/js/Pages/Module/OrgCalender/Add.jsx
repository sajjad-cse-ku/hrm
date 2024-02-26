import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from "react-select";

function Add() {
    const {  flash,errors } = usePage().props;
    const [values, setValues] = useState({
        calender_year: "",
        month_id:1,
        c_month_id:"",
        // month_name:"",
        start_from:"",
        ends_on:"",
        salary_open:'F',
        salary_update:'F',
        food_open:'F',
    });



    const monthOptions = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const salaryOpenOptions = [
        { value: 'F', label: 'Future' },
        { value: 'O', label: 'Open' },
        { value: 'C', label: 'Close' },
    ];

    const salaryUpdateOptions = [
        { value: 'F', label: 'Future' },
        { value: 'O', label: 'Open' },
        { value: 'C', label: 'Close' },
    ];

    const foodOpenOptions = [
        { value: 'F', label: 'Future' },
        { value: 'O', label: 'Open' },
        { value: 'C', label: 'Close' },
    ];

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        router.post("/admin/org_calender/store", values);
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
                            Org Calenders
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
                            Org Calenders
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
                                    <label>Type Year<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="calender_year"
                                        type="number"
                                        placeholder="2023"
                                        className="form-input"
                                        value={values.calender_year}
                                        onChange={handleChange}
                                    />
                                    {errors.calender_year && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.calender_year}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Month Name
                                    </label>
                                    <Select
                                        id="month_id"
                                        options={monthOptions}
                                        value={monthOptions.find(option => option.value === values.month_id)}
                                        onChange={(selectedOption) => setValues({ ...values, month_id: selectedOption.value })}
                                        isSearchable={true}
                                    />
                                    {errors.month_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.month_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Calender Month ID<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="c_month_id"
                                        type="number"
                                        placeholder="Enter Calender Month ID"
                                        className="form-input"
                                        value={values.c_month_id}
                                        onChange={handleChange}
                                    />
                                    {errors.c_month_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.c_month_id}
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <div>
                                    <label>
                                        Salary Open
                                    </label>
                                    <Select
                                        id="salary_open"
                                        options={salaryOpenOptions}
                                        value={salaryOpenOptions.find(option => option.value === values.salary_open)}
                                        onChange={(selectedOption) => setValues({ ...values, salary_open: selectedOption.value })}
                                        isSearchable={true}
                                    />
                                </div>

                                <div>
                                    <label>
                                        Salary Update
                                    </label>
                                    <Select
                                        id="salary_update"
                                        options={salaryUpdateOptions}
                                        value={salaryUpdateOptions.find(option => option.value === values.salary_update)}
                                        onChange={(selectedOption) => setValues({ ...values, salary_update: selectedOption.value })}
                                        isSearchable={true}
                                    />
                                </div>

                                <div>
                                    <label>
                                        Food Open
                                    </label>
                                    <Select
                                        id="food_open"
                                        options={foodOpenOptions}
                                        value={foodOpenOptions.find(option => option.value === values.food_open)}
                                        onChange={(selectedOption) => setValues({ ...values, food_open: selectedOption.value })}
                                        isSearchable={true}
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <div>
                                    <label>Start From<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="start_from"
                                        type="date"
                                        placeholder="Enter Start From"
                                        className="form-input"
                                        value={values.start_from}
                                        onChange={handleChange}
                                    />
                                    {errors.start_from && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.start_from}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Ends From<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="ends_on"
                                        type="date"
                                        placeholder="Enter Ends From"
                                        className="form-input"
                                        value={values.ends_on}
                                        onChange={handleChange}
                                    />
                                    {errors.ends_on && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.ends_on}
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
    <MainLayout children={page} title="HR || Add Org Calender" />
);

export default Add;
