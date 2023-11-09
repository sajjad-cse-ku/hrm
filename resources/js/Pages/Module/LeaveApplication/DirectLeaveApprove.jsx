import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from "react-select";
import axios from "axios";

function DirectLeaveApprove() {
    const {  flash ,users ,errors} = usePage().props;
    const [isLeaveData,setLeaveData] = useState();
    const [isEligibilityData,setEligibilityData] = useState();
    const [values, setValues] = useState({
        user_id:"",
        leave_id:"",
        from_date:"",
        to_date:"",
        nods:"",
        reason:"",
    });
    const options = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} (${user.id}) - ${user?.professionaldata?.designation?.name} - ${user?.professionaldata?.department?.name}` : '',
    }));

    const handleLeaveData = async (selectedOption) => {
        setEligibilityData(null)
        const user_id = selectedOption ? selectedOption.value : ''; // Extract user_id
        setValues((prevValues) => ({
            ...prevValues,
            user_id
        }));
        try {
            const response = await axios.get('/admin/get-leave-data/'+selectedOption?.value);
            setLeaveData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEligibility = async (selectedOption) => {

        const leave_id = selectedOption ? selectedOption : ''; // Extract user_id
        setValues((prevValues) => ({
            ...prevValues,
            leave_id
        }));

        try {
            const response = await axios.get('/admin/get-eligibility-leave-balance/'+selectedOption+'/'+values.user_id);
            setEligibilityData(response.data);
        } catch (error) {
            console.error(error);
        }
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
        router.post("/admin/leave_application/direct-leave-approve/apply", values);
        // setValues({
        //     name: "",
        //     short_code:""
        // })
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
                            Leave Category
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
                            Leave Category
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
                                    <label>Employee</label>
                                    <Select placeholder="Select an option"
                                            options={options}
                                            value={options.find((option) => option.value === values.user_id)}
                                            onChange={handleLeaveData}
                                    />
                                    {errors.user_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.user_id}
                                        </div>
                                    )}
                                </div>
                                {
                                    isLeaveData && (
                                        <div>
                                            <label>
                                                Title
                                            </label>
                                            <select
                                                id="leave_id"
                                                className="form-select text-white-dark"
                                                onChange={(event) => handleEligibility(event.target.value)}
                                            >
                                                <option value="">Choose Option...</option>
                                                {isLeaveData.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.leave_id}
                                                    >
                                                        {item.leavecategory?.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                }

                            </div>
                            {
                                isEligibilityData  &&(
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label>Leave Eligible</label>
                                            <input
                                                id="leave_eligible"
                                                type="text"
                                                placeholder="Enter Leave Eligible"
                                                className="form-input bg-indigo-200"
                                                value={isEligibilityData?.leave_eligible}
                                                disabled="disabled"
                                            />
                                        </div>
                                        <div>
                                            <label>Leave Balance</label>
                                            <input
                                                id="leave_balance"
                                                type="text"
                                                placeholder="Leave Balance"
                                                className="form-input bg-indigo-200"
                                                value={isEligibilityData?.leave_balance}
                                                disabled="disabled"
                                            />
                                        </div>
                                        <div>
                                            <label>Leave Enjoyed</label>
                                            <input
                                                id="leave_enjoyed"
                                                type="text"
                                                placeholder="Leave Enjoyed"
                                                className="form-input bg-indigo-200"
                                                value={isEligibilityData?.leave_enjoyed}
                                                disabled="disabled"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Leave Date</label>
                                    <input
                                        id="from_date"
                                        type="date"
                                        placeholder="Enter From Date"
                                        className="form-input"
                                        value={values?.from_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Leave Date</label>
                                    <input
                                        id="to_date"
                                        type="date"
                                        placeholder="Enter To Date"
                                        className="form-input"
                                        value={values?.to_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Nods</label>
                                    <input
                                        id="nods"
                                        type="number"
                                        placeholder="Enter To Date"
                                        className="form-input"
                                        value={values?.nods}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>

                                </div>
                                <div className="md:col-span-3">
                                    <label>Reason</label>

                                    <textarea
                                       id="reason"
                                       type="text"
                                       placeholder="Write Reason"
                                       className="form-input"
                                       value={values.reason}
                                       onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary !mt-6"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

DirectLeaveApprove.layout = (page) => (
    <MainLayout children={page} title="HR || Leave Approved By HR" />
);

export default DirectLeaveApprove;
