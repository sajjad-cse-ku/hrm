import React, {useEffect, useState} from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import Select from "react-select";

function Edit() {
    const {  flash,departments ,sections, users,result,errors } = usePage().props;

    const [isSection, setSection] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');

    const { register, handleSubmit, setValue, formState } = useForm({
        defaultValues: {
            id: result?.id,
            user_id: result?.user_id,
            section_id: result?.section_id,
            department_id: result?.department_id,
            report_to: result?.report_to,
            posting_start_date: result?.posting_start_date,
            posting_end_date: result?.posting_end_date,
            posting_notes: result?.posting_notes,
            descriptions: result?.descriptions,
        },
    });
    // console.log(result);



    useEffect(() => {
        const sectionSelectUsingDept = async () => {
            try {
                const response = await axios.get('/admin/section-select/' + result?.department_id);
                // console.log(response.data);
                setSection(response.data);
                setSelectedSection(result?.section_id || '');
            } catch (error) {
                console.error(error);
            }
        };
        sectionSelectUsingDept();
    }, [name]);

    const sectionSelect =  async (id) => {
        try {
            const response = await axios.get('/admin/section-select/'+id);
            setSection(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDepartmentChange = (selectedOption) => {
        setValue("department_id", selectedOption.value);
    };
    const handleSectionChange = (selectedOption) => {
        setValue("section_id", selectedOption.value);
    };
    const handleSelectUser = (selectedOption) => {
        setValue("report_to", selectedOption?.value);
    };
    const department = departments.map((department) => ({
        value: department?.id,
        label: department?.name,
    }));
    const report = users.map((user) => ({
        value: user?.id,
        label: `${user?.first_name} ${user?.last_name} - ${user?.id}`,
    }));

    const section = isSection.map((section) => ({
        value: section?.id,
        label: section?.name,
    }));

    function onSubmit(data) {
        // console.log(data)
        router.post("/admin/employee_posting/update", data);
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
                            Employee Posting
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
                            Employee Posting
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit(onSubmit)} method="post"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/*<input*/}
                                {/*    type="hidden"*/}
                                {/*    value={result?.user_id}*/}
                                {/*    {...register("user_id", )}*/}
                                {/*/>*/}
                                <div>
                                    <label>
                                        Department
                                    </label>
                                    <Select
                                        isSearchable={true}
                                        options={department}
                                        {...register("department_id")}
                                        defaultValue={department.find(department => department.value === result?.department_id)}
                                        onChange={(selectedOption) => {
                                            handleDepartmentChange(selectedOption);
                                            sectionSelect(selectedOption.value);
                                        }}
                                    />

                                </div>
                                <div>
                                    <label>
                                        Section
                                    </label>
                                    <Select
                                        isSearchable={true}
                                        options={section}
                                        defaultValue={section.find((s) => s.value === selectedSection)}
                                        {...register("section_id")}
                                        onChange={(selectedOption) => handleSectionChange(selectedOption)}
                                    />
                                </div>
                                <div>
                                    <label>
                                        Report To
                                    </label>
                                    <Select
                                        isSearchable={true}
                                        options={report}
                                        defaultValue={report.find(report => report.value === result?.report_to)}
                                        {...register("report_to")}
                                        onChange={handleSelectUser}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Posting Start Date</label>
                                    <input
                                        // id="posting_start_date"
                                        type="date"
                                        placeholder="Enter Result"
                                        className="form-input"
                                        {...register("posting_start_date")}
                                        // value={values.posting_start_date}
                                        // onChange={handleChange}
                                    />
                                    {errors.posting_start_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.posting_start_date}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Posting End Date</label>
                                    <input
                                        // id="posting_end_date"
                                        type="date"
                                        placeholder="Enter Degree Type"
                                        className="form-input"
                                        {...register("posting_end_date")}
                                        // value={values.posting_end_date}
                                        // onChange={handleChange}
                                    />

                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label>Posting Notes</label>

                                    <textarea
                                        // id="posting_notes"
                                        placeholder="Enter Posting Notes"
                                        className="form-input"
                                        {...register("posting_notes")}
                                        // value={values.posting_notes}
                                        // onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div>
                                    <label>descriptions</label>

                                    <textarea
                                        // id="descriptions"
                                        placeholder="Enter Description"
                                        className="form-input"
                                        {...register("descriptions")}
                                        // value={values.descriptions}
                                        // onChange={handleChange}
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

Edit.layout = (page) => (
    <MainLayout children={page} title="HR || Edit Title" />
);

export default Edit;
