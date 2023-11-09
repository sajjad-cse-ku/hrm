import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import {themeConfig} from "../../Store/ThemeConfig.js";

function Apply() {
    const {  flash , result , errors,users,leave_name,pre_leave_applications } = usePage().props;
    const isRtl = themeConfig.rtlClass === "rtl" ? true : false;
    const [values, setValues] = useState({
        id: result.id,
        user_id: result.user_id,
        leave_id:result.leave_id,
        leave_year:result.leave_year,
        from_date:"",
        to_date:"",
        nods:"",
        duty_date:"",
        location:"",
        leave_attachment:"",
        alternative_id:"",
        reason:"",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = key === 'leave_attachment' ? e.target.files[0] : e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        router.post("/admin/leave_application/apply/process", values);
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
                        <Link href="#" className="text-primary hover:underline font-bold">
                            {leave_name}
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Leave</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel">
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src={result?.user?.avatar ? `/storage/profile/${result?.user?.avatar}` : '/assets/images/user-profile.jpeg'} alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">{result?.user?.first_name} {result?.user?.last_name}</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                        <path
                                            d="M2.3153 12.6978C2.26536 12.2706 2.2404 12.057 2.2509 11.8809C2.30599 10.9577 2.98677 10.1928 3.89725 10.0309C4.07094 10 4.286 10 4.71612 10H15.2838C15.7139 10 15.929 10 16.1027 10.0309C17.0132 10.1928 17.694 10.9577 17.749 11.8809C17.7595 12.057 17.7346 12.2706 17.6846 12.6978L17.284 16.1258C17.1031 17.6729 16.2764 19.0714 15.0081 19.9757C14.0736 20.6419 12.9546 21 11.8069 21H8.19303C7.04537 21 5.9263 20.6419 4.99182 19.9757C3.72352 19.0714 2.89681 17.6729 2.71598 16.1258L2.3153 12.6978Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path opacity="0.5" d="M17 17H19C20.6569 17 22 15.6569 22 14C22 12.3431 20.6569 11 19 11H17.5" stroke="currentColor" strokeWidth="1.5" />
                                        <path
                                            opacity="0.5"
                                            d="M10.0002 2C9.44787 2.55228 9.44787 3.44772 10.0002 4C10.5524 4.55228 10.5524 5.44772 10.0002 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4.99994 7.5L5.11605 7.38388C5.62322 6.87671 5.68028 6.0738 5.24994 5.5C4.81959 4.9262 4.87665 4.12329 5.38382 3.61612L5.49994 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14.4999 7.5L14.6161 7.38388C15.1232 6.87671 15.1803 6.0738 14.7499 5.5C14.3196 4.9262 14.3767 4.12329 14.8838 3.61612L14.9999 3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>{' '}
                                    {result?.user?.professionaldata?.designation?.name}
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                        <path
                                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path opacity="0.5" d="M7 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M17 4V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M2 9H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    {result?.user?.professionaldata?.joining_date}
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                                        <path
                                            opacity="0.5"
                                            d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M20.9605 15.5C21.6259 16.1025 22 16.7816 22 17.5C22 19.9853 17.5228 22 12 22C6.47715 22 2 19.9853 2 17.5C2 16.7816 2.37412 16.1025 3.03947 15.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {result?.user?.personaldata?.pr_address} , {result?.user?.personaldata?.pr_district}
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                            <path
                                                opacity="0.5"
                                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="text-primary truncate">{result?.user?.email}</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                    <span className="whitespace-nowrap" dir="ltr">
                                    {result?.user?.mobile ?? "N/A"}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3">
                        <div className="mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Previous <span className="text-primary font-bold">{leave_name}</span> Leave</h5>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <table className="whitespace-nowrap">
                                    <thead>
                                        <tr>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Nod</th>
                                        <th>Reason</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                    {pre_leave_applications.map((leave)=>(
                                        <tr key={leave}>
                                            <td>{leave?.from_date}</td>
                                            <td>{leave?.to_date}</td>
                                            <td className="text-danger">{leave?.nods}</td>
                                            <td className="text-center">{leave?.reason}</td>
                                            <td>
                                                <Link
                                                    href='#'
                                                    method="get"
                                                    className="px-3 py-1 bg-success text-white rounded-md text-[15px] mr-2"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href='#'
                                                    method="get"
                                                    className="px-3 py-1 bg-primary text-white rounded-md text-[15px] mr-2"
                                                >
                                                    Download
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            <span className="text-primary">{leave_name}</span> Leave Form
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
                                    <label>From Date</label>
                                    <input
                                        id="from_date"
                                        type="date"
                                        className="form-input"
                                        value={values.from_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>To Date</label>
                                    <input
                                        id="to_date"
                                        type="date"
                                        className="form-input"
                                        value={values.to_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Nods</label>
                                    <input
                                        id="nods"
                                        type="number"
                                        placeholder = "Number of days"
                                        className="form-input"
                                        value={values.nods}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {!leave_name.includes("Casual") &&
                                    !leave_name.includes("Sick") &&
                                    !leave_name.includes("Maternity") &&
                                    !leave_name.includes("Training") &&
                                    !leave_name.includes("Special") &&
                                    !leave_name.includes("Without Pay Leave") && (
                                        <div>
                                            <label>Duty Date</label>
                                            <input
                                                id="duty_date"
                                                type="date"
                                                className="form-input"
                                                value={values.duty_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}
                                <div>
                                    <label>Location</label>
                                    <input
                                        id="location"
                                        type="text"
                                        className="form-input"
                                        value={values.location}
                                        onChange={handleChange}
                                    />
                                </div>
                                {!leave_name.includes("Casual") &&
                                    !leave_name.includes("Alternative") &&
                                    !leave_name.includes("Maternity") &&
                                    !leave_name.includes("Training") &&
                                    !leave_name.includes("Special") &&
                                    !leave_name.includes("Without Pay Leave") && (                                    <div>
                                        <label>Leave Attachment</label>
                                        <input
                                            id="leave_attachment"
                                            type="file"
                                            className="form-input"
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                <div>
                                    <label>
                                        Alternative Id
                                    </label>
                                    <select
                                        id="alternative_id"
                                        className="form-select text-white-dark"
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
                                <div className="md:col-span-2">
                                    <label>Reason</label>
                                    <input
                                        id="reason"
                                        type="text"
                                        placeholder="Write Reason"
                                        className="form-input"
                                        value={values.reason}
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

Apply.layout = (page) => (
    <MainLayout children={page} title="HR || Apply Leave Application" />
);

export default Apply;
