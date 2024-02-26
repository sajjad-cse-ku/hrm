import React, { useState } from "react";
import MainLayout from "../../../Layout/Mainlayout.jsx";
import { Link, router, usePage } from "@inertiajs/react";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../../Component/FlashMessage.jsx";
import { useForm } from "react-hook-form";
import Select from "react-select";


function SalaryHeldReport() {
    const { flash, base_url, } = usePage().props;
    const [values, setValues] = useState({
        month_id: new Date().getMonth() + 1,
        salary_year: new Date().getFullYear(),
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

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
    ]

    function onSubmit() {
        const url = `/admin/get-salary-held-data/${values.salary_year}/${values.month_id}`;
        router.get(url);
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
                            Salary Management
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Generate Monthly Salary</span>
                    </li>
                </ul>
            </div>
            <div>
                <div className="mb-5">
                    <div className="pt-5 mx-auto max-w-screen-md">
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} method="get">
                            <div className="panel" id="forms_grid">
                                <div>
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Generate Monthly Salary</h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label>Salary Month</label>
                                            <Select
                                                id="month_id"
                                                options={monthOptions}
                                                defaultValue={monthOptions.find(option => option.value === String(values.month_id))}
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
                                            <label>Salary Year</label>
                                            <input
                                                {...register("salary_year")}
                                                type="number"
                                                className="form-input"
                                                defaultValue={values.salary_year}
                                            />
                                        </div>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

SalaryHeldReport.layout = (page) => (
    <MainLayout children={page} title="Salary Held Report" />
);

export default SalaryHeldReport;
