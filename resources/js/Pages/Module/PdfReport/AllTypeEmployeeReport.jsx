import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from 'react-select';

function AllTypeEmployeeReport() {
    const {  flash,departments,designations,religions,working_status } = usePage().props;
    const [employeeReport , setEmployeeReport] = useState(false);
    const [employeeReportDateRange , setEmployeeReportDateRange] = useState(false);
    // const [values, setValues] = useState({
    //     emp_dept:"all",
    //     date_range:"no",
    // });

    const [selectedValues, setSelectedValues] = useState({
        from_date:"",
        to_date:"",
        date_range:"no",
        emp_dept:"all",
        gender: [],
        religion: [],
        working: [],
        department: [],
        designation: [],
    });

    function handleSelectChange(e) {
        const selectedValue = e.target.value; // Get the selected value

        if (selectedValue === "all") {
            setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                emp_dept: selectedValue
            }));
            setEmployeeReport(false)
        } else if (selectedValue === "dept") {
            setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                emp_dept: selectedValue
            }));
            setEmployeeReport(true)
        }

    }
    function handleSelectDateChange(e) {
        const selectedValue = e.target.value; // Get the selected value
        if (selectedValue === "no") {
            setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                date_range: selectedValue
            }));
            setEmployeeReportDateRange(false)
        } else if (selectedValue === "yes") {
            setSelectedValues((prevSelectedValues) => ({
                ...prevSelectedValues,
                date_range: selectedValue
            }));
            setEmployeeReportDateRange(true)
        }

    }

    function handleChange(e) {
        const key = e.target.id; // Get the name attribute from the checkbox
        const value = e.target.value;

        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [key]: e.target.checked
                ? [...prevSelectedValues[key], value]
                : prevSelectedValues[key].filter((item) => item !== value),
        }));
    }

    function handleChangeDateTime(e) {
        const key = e.target.id; // Get the id attribute from the input
        const value = e.target.type === 'date' ? e.target.value : e.target.value;

        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [key]: value,
        }));
    }

    // console.log(selectedValues)
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(selectedValues);
        // router.get("/admin/all-type-employee-report",values);
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
                            All Type Employee Report
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Search</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            method="post"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label>
                                        Select All Employee or Department
                                    </label>
                                    <select
                                        id="emp_dept"
                                        className="form-select text-white-dark"
                                        onChange={handleSelectChange}
                                        defaultValue={selectedValues.emp_dept || ''}
                                    >
                                        <option value="all">All</option>
                                        <option value="dept">Department</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        Set Date Range
                                    </label>
                                    <select
                                        id="date_range"
                                        className="form-select text-white-dark"
                                        onChange={handleSelectDateChange}
                                        defaultValue={selectedValues.date_range || ''}
                                    >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            {employeeReportDateRange &&
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label>
                                            From Date
                                        </label>
                                        <input
                                            id="from_date"
                                            type="date"
                                            placeholder="Enter Currency"
                                            className="form-input"
                                            value={selectedValues.from_date || ''}
                                            onChange={handleChangeDateTime}
                                        />
                                    </div>
                                    <div>
                                        <label>
                                            To Date
                                        </label>
                                        <input
                                            id="to_date"
                                            type="date"
                                            placeholder="Enter Currency"
                                            className="form-input"
                                            value={selectedValues.to_date || ''}
                                            onChange={handleChangeDateTime}
                                        />
                                    </div>
                                </div>
                            }
                            <br/>
                            {employeeReport &&
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                        <div className="mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">Working Status</h5>
                                            <div className="space-y-2 pt-3">
                                                {working_status.map((item,index) => (
                                                    <div key={index}>
                                                        <label className="inline-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox text-dark rounded-full"
                                                                id="working"
                                                                value={item.id}
                                                                onChange={handleChange}
                                                            />
                                                            <span>{item?.name}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">Department</h5>
                                            <div className="space-y-2 pt-3">
                                                {departments.map((item,index) => (
                                                    <div key={index}>
                                                        <label className="inline-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox text-dark rounded-full"
                                                                id="department"
                                                                value={item.id}
                                                                onChange={handleChange}
                                                            />
                                                            <span>{item?.name}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">Religion</h5>
                                            <div className="space-y-2 pt-3">
                                                {religions.map((item,index) => (
                                                    <div key={index}>
                                                        <label className="inline-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox text-dark rounded-full"
                                                                id="religion"
                                                                value={item.id}
                                                                onChange={handleChange}
                                                            />
                                                            <span>{item?.name}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">Gender</h5>
                                            <div className="space-y-2 pt-3">
                                                <div>
                                                    <label className="inline-flex">
                                                        <input
                                                            className="form-checkbox text-dark rounded-full"
                                                            type="checkbox"
                                                            id="gender"
                                                            value="Male"
                                                            onChange={handleChange}
                                                        />
                                                        <span>Male</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input
                                                            className="form-checkbox text-dark rounded-full"
                                                            type="checkbox"
                                                            id="gender"
                                                            value="Female"
                                                            onChange={handleChange}
                                                        />
                                                        <span>Female</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div className="mb-5">
                                            <h5 className="font-semibold text-lg dark:text-white-light">Designation</h5>
                                            <div className="grid grid-cols-5 gap-4 pt-3">
                                                {designations.map((item, index) => (
                                                    <div key={index}>
                                                        <div>
                                                            {index % 5 === 0 ? (
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <label className="inline-flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox text-dark peer"
                                                                                id="designation"
                                                                                value={item.id}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <span className="peer-checked:text-dark">{item?.name}</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {index % 5 === 1 ? (
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <label className="inline-flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox text-dark peer"
                                                                                id="designation"
                                                                                value={item.id}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <span className="peer-checked:text-dark">{item?.name}</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {index % 5 === 2 ? (
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <label className="inline-flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox text-dark peer"
                                                                                id="designation"
                                                                                value={item.id}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <span className="peer-checked:text-dark">{item?.name}</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {index % 5 === 3 ? (
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <label className="inline-flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox text-dark peer"
                                                                                id="designation"
                                                                                value={item.id}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <span className="peer-checked:text-dark">{item?.name}</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                            {index % 5 === 4 ? (
                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <label className="inline-flex">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="form-checkbox text-dark peer"
                                                                                id="designation"
                                                                                value={item.id}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <span className="peer-checked:text-dark">{item?.name}</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                            <br/>
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

AllTypeEmployeeReport.layout = (page) => (
    <MainLayout children={page} title="HR || Employee Report" />
);

export default AllTypeEmployeeReport;
