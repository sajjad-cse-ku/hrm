import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from "react-select";

function ManualComment() {
    const {  flash,auth,errors,users } = usePage().props;
    const [isDate,setDate]=useState(new Date().toLocaleDateString())
    const [values, setValues] = useState({
        comment:"",
        user_id: "",
    });
    const handleTextEditor = (comment) => {
        setValues((prevValues) => ({
            ...prevValues,
            comment,
        }));
    };
    const handleSelectChange = (selectedOption) => {
        const user_id = selectedOption ? selectedOption.value : ''; // Extract user_id
        setValues((prevValues) => ({
            ...prevValues,
            user_id,
        }));
    };
    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };
    const options = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} - ${user.id}` : '',
    }));
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        router.post("/admin/manual-comment/update", values);
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
                            Manual Comment
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
                            Apply for Late Allow
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            method="post"
                        >

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <label>Date<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="late_date"
                                        type="text"
                                        placeholder="Enter Title"
                                        className="form-input"
                                        value={isDate}
                                        disabled="disabled"
                                    />
                                </div>

                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                                <div>
                                    <ReactQuill
                                        theme="snow"
                                        value={values.comment}
                                        onChange={handleTextEditor}
                                    />
                                    {errors.comment && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.comment}
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

ManualComment.layout = (page) => (
    <MainLayout children={page} title="HR || Manual Component" />
);

export default ManualComment;
