import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from 'react-select';

function Add({ group_company_list }) {
    const {  flash ,users,departments } = usePage().props;
    const { errors } = usePage().props;
    const users_list = users.map((item) => ({
        value: item.id,
        label: item.first_name+' '+item.last_name,
      }));

      const department_list = departments.map((item) => ({
        value: item.id,
        label: item.name,
      }));





    const [values, setValues] = useState({
        name:"",
        short_name:"",
        section_code:"",
        started_from:"",
        top_rank:"",
        report_to:"",
        headed_by:"",
        second_man:"",
        department_id:"",
        email:""
    });
    const [selectedOption, setSelectedOption] = useState(users_list[0]);
    const [selectedReportTo, setSelectedReportTo] = useState(null);
    const [selectedHeadedBy, setSelectedHeadedBy] = useState(null);
    const [selectedSecondMan, setSelectedSecondMan] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const handleReportToChange = (selectedOption) => {
        setSelectedReportTo(selectedOption);
    };

    const handleHeadedByChange = (selectedOption) => {
        setSelectedHeadedBy(selectedOption);
    };

    const handleSecondManChange = (selectedOption) => {
        setSelectedSecondMan(selectedOption);
    };
    const handleDepartmentChange = (selectedOption) => {
        setSelectedDepartment(selectedOption);
    };
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
        const updatedValues = {
            ...values,
            report_to: selectedReportTo ? selectedReportTo.value : null,
            headed_by: selectedHeadedBy ? selectedHeadedBy.value : null,
            second_man: selectedSecondMan ? selectedSecondMan.value : null,
            department_id: selectedDepartment ? selectedDepartment.value : null,
        };
        router.post("/admin/section/store", updatedValues);
        setValues({
            name:"",
            section_code:"",
            short_name:"",
            department_code:"",
            started_from:"",
            top_rank:"",
            report_to:"",
            headed_by:"",
            second_man:"",
            department_id:"",
            email:""
        })
        setSelectedReportTo(null);
        setSelectedHeadedBy(null);
        setSelectedSecondMan(null);
        setSelectedDepartment(null);
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
                        <span>Add</span>
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
                                    <label>Name<span className="text-red-600 ">*</span></label>
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
                                    <label>Short Name<span className="text-red-600 ">*</span></label>
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
                                    {/* <select
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
                                    </select> */}
                                    <Select
                                        id="department_id"
                                        value={selectedDepartment}
                                        options={department_list}
                                        onChange={handleDepartmentChange}
                                        placeholder="Choose Option..."
                                    />
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
                                    {/* <select
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
                                    </select> */}
                                    <Select
                                        id="report_to"
                                        value={selectedReportTo}
                                        options={users_list}
                                        onChange={handleReportToChange}
                                        placeholder="Choose Option..."
                                    />
                                </div>
                                <div>
                                    <label>
                                        Headed By
                                    </label>
                                    {/* <select
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
                                    </select> */}
                                     <Select
                                        id="headed_by"
                                        value={selectedHeadedBy}
                                        options={users_list}
                                        onChange={handleHeadedByChange}
                                        placeholder="Choose Option..."
                                    />
                                </div>
                                <div>
                                    <label>
                                        Second Man
                                    </label>
                                    <Select
                                        id="second_man"
                                        value={selectedSecondMan}
                                        options={users_list}
                                        onChange={handleSecondManChange}
                                        placeholder="Choose Option..."
                                    />
                                    {/* <select
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
                                    </select> */}
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

Add.layout = (page) => (
    <MainLayout children={page} title="HR || Add Section" />
);

export default Add;
