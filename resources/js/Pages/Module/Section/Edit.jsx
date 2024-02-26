import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";

function Edit({ result }) {
    const {  flash ,users,departments } = usePage().props;
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        id: result.id,
        name: result.name,
        email: result.email,
        short_name:result.short_name,
        section_code:result.section_code,
        department_code:result.department_code,
        started_from:result.started_from,
        top_rank:result.top_rank,
        report_to:result.report_to,
        headed_by:result.headed_by,
        second_man:result.second_man,
        department_id:result.department_id,

    });

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
        router.post("/admin/section/update", values);
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
                            Sub Department
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Edit</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Sub Department
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
                                    <label>Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter Name"
                                        className="form-input"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Short Name</label>
                                    <input
                                        id="short_name"
                                        type="text"
                                        placeholder="Enter Short Name"
                                        className="form-input"
                                        value={values.short_name}
                                        onChange={handleChange}
                                    />
                                    {errors.short_name && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.short_name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Department
                                    </label>
                                    <select
                                        id="department_id"
                                        className="form-select text-white-dark"
                                        value={values.department_id}
                                        onChange={handleChange}
                                    >
                                        <option>Choose...</option>
                                        {departments.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Section Code</label>
                                    <input
                                        id="section_code"
                                        type="number"
                                        placeholder="Enter Department Code"
                                        className="form-input"
                                        value={values.section_code}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div>
                                    <label>Started From</label>
                                    <input
                                        id="started_from"
                                        type="date"
                                        placeholder="Enter Started From"
                                        className="form-input"
                                        value={values.started_from}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label>Email</label>
                                    <input
                                        id="email"
                                        type="text"
                                        placeholder="Enter Email"
                                        className="form-input"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>
                                        Report To
                                    </label>
                                    <select
                                        id="report_to"
                                        className="form-select text-white-dark"
                                        value={values.report_to}
                                        onChange={handleChange}
                                    >
                                        <option>Choose...</option>
                                        {users.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.first_name} {item.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        Headed By
                                    </label>
                                    <select
                                        id="headed_by"
                                        className="form-select text-white-dark"
                                        value={values.headed_by}
                                        onChange={handleChange}
                                    >
                                        <option>Choose...</option>
                                        {users.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.first_name} {item.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        Second Man
                                    </label>
                                    <select
                                        id="second_man"
                                        className="form-select text-white-dark"
                                        value={values.second_man}
                                        onChange={handleChange}
                                    >
                                        <option>Choose...</option>
                                        {users.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.first_name} {item.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Top Rank</label>
                                    <input
                                        id="top_rank"
                                        type="text"
                                        placeholder="Enter Title"
                                        className="form-input"
                                        value={values.top_rank}
                                        onChange={handleChange}
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => (
    <MainLayout children={page} title="HR || Edit Designation" />
);

export default Edit;
