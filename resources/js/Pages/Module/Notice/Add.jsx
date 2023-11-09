import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from 'react-select';

function Add({}) {
    const { errors, flash, users, departments } = usePage().props;
    const [values, setValues] = useState({
        notice_date: "",
        expiry_date: "",
        title: "",
        description: "",
        sender: "",
        type: "",
        confidentiality: "",
        receiver: "",
        file_path: ""
    });

    // Initialize selected options with default values
    const [selectedOptionType, setSelectedOptionType] = useState({ value: "D", label: "Display" });
    const [selectedOptionConfidentiality, setSelectedOptionConfidentiality] = useState({ value: "P", label: "Public" });
    const [selectedOptionReceiver, setSelectedOptionReceiver] = useState({ value: "A", label: "All" });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = key === 'file_path' ? e.target.files[0] : e.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    };

    const handleSelectChangeType = (selectedOption) => {
        setSelectedOptionType(selectedOption);
    };

    const handleSelectChangeConfidentiality = (selectedOption) => {
        setSelectedOptionConfidentiality(selectedOption);
    };

    const handleSelectChangeReceiver = (selectedOption) => {
        setSelectedOptionReceiver(selectedOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedValues = {
            ...values,
            type: selectedOptionType ? selectedOptionType.value : "",
            confidentiality: selectedOptionConfidentiality ? selectedOptionConfidentiality.value : "",
            receiver: selectedOptionReceiver ? selectedOptionReceiver.value : ""
        };
        router.post("/admin/notice/store", updatedValues);

        setValues({
            notice_date: "",
            expiry_date: "",
            title: "",
            description: "",
            sender: "",
            type: "",
            confidentiality: "",
            receiver: "",
            file_path: ""
        });

        setSelectedOptionType({ value: "D", label: "Display" });
        setSelectedOptionConfidentiality({ value: "P", label: "Public" });
        setSelectedOptionReceiver({ value: "A", label: "All" });
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
                        {/* ... Your SVG path ... */}
                    </svg>
                </div>
                <ul className="flex space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="#" className="text-primary hover:underline">
                            Notice
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
                            Notice
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            method="post"
                            encType="multipart/form-data"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label>Title<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="Enter Title"
                                        className="form-input"
                                        value={values.title}
                                        onChange={handleChange}
                                    />
                                    {errors.title && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Sender<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="sender"
                                        type="text"
                                        placeholder="Enter Sender"
                                        className="form-input"
                                        value={values.sender}
                                        onChange={handleChange}
                                    />
                                    {errors.sender && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.sender}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>
                                        Type
                                    </label>
                                    <Select
                                        id="type"
                                        value={selectedOptionType}
                                        options={[
                                            { value: "D", label: "Display" },
                                            { value: "E", label: "Email" }
                                        ]}
                                        onChange={handleSelectChangeType}
                                        placeholder="Choose..."
                                    />
                                </div>
                                <div>
                                    <label>
                                        Confidentiality
                                    </label>
                                    <Select
                                        id="confidentiality"
                                        value={selectedOptionConfidentiality}
                                        options={[
                                            { value: "P", label: "Public" },
                                            { value: "C", label: "Confidential" }
                                        ]}
                                        onChange={handleSelectChangeConfidentiality}
                                        placeholder="Choose..."
                                    />
                                </div>
                                <div>
                                    <label>
                                        Receiver
                                    </label>
                                    <Select
                                        id="receiver"
                                        value={selectedOptionReceiver}
                                        options={[
                                            { value: "A", label: "All" },
                                            { value: "P", label: "Person" },
                                            { value: "D", label: "Department" }
                                        ]}
                                        onChange={handleSelectChangeReceiver}
                                        placeholder="Choose..."
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Notice Date</label>
                                    <input
                                        id="notice_date"
                                        type="date"
                                        placeholder="Enter Sender"
                                        className="form-input"
                                        value={values.notice_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Expiry Date</label>
                                    <input
                                        id="expiry_date"
                                        type="date"
                                        placeholder="Enter Sender"
                                        className="form-input"
                                        value={values.expiry_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>File Path</label>
                                    <input
                                        id="file_path"
                                        type="file"
                                        className="form-input"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label>Description</label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter Description"
                                        className="form-input"
                                        value={values.description}
                                        onChange={handleChange}
                                    ></textarea>
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
    <MainLayout children={page} title="HR || Add Notice" />
);

export default Add;
