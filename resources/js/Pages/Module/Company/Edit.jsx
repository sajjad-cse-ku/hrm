import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";

function Edit() {
    const { errors, flash, result, group_company_list } = usePage().props;
    const [groupID, setGroupID] = useState(result.group_company_id);
    const [values, setValues] = useState({
        id: result.id,
        group_id: result.group_company_id,
        name: result.name,
        address: result.address,
        city: result.city,
        state: result.state,
        post_code: result.post_code,
        email: result.email,
        country: result.country,
        phone_no: result.phone_no,
        website: result.website,
        currency: result.currency,
    });
    const [activeBtn, setActiveBtn] = useState("address");

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setGroupID(value);
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        router.post("/admin/companies/update", values);
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
                            Company
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Edit</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5 mx-4">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Group Company
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            method="post"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                <div className="mx-4">
                                    <label>Group Company</label>
                                    <select
                                        id="group_id"
                                        className="form-select text-white-dark"
                                        value={groupID || ""}
                                        onChange={handleChange}
                                    >
                                        <option>Choose...</option>
                                        {group_company_list.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id || ""}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.group_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.group_id || ""}
                                        </div>
                                    )}
                                </div>
                                <div className="mx-4">
                                    <label>Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter Group of Company Name"
                                        className="form-input"
                                        value={values.name || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Basic Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="mx-4">
                                    <label>Website</label>
                                    <input
                                        id="website"
                                        type="text"
                                        placeholder="Enter Website"
                                        className="form-input"
                                        value={values.website || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mx-4">
                                    <label>Currency</label>
                                    <input
                                        id="currency"
                                        type="text"
                                        placeholder="Enter Currency"
                                        className="form-input"
                                        value={values.currency || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* Button */}
                            <div className="flex nowrap items-center pt-2 mx-4 border-b border-solid border-gray-300">
                                <button
                                    type="button"
                                    className={`${
                                        activeBtn === "address"
                                            ? " btn-after  font-extrabold"
                                            : ""
                                    } btn bg-transparent border-0 relative`}
                                    onClick={() => setActiveBtn("address")}
                                >
                                    Address
                                </button>
                                <button
                                    type="button"
                                    className={`${
                                        activeBtn === "contact"
                                            ? " btn-after  font-extrabold"
                                            : ""
                                    } btn bg-transparent border-0 relative`}
                                    onClick={() => setActiveBtn("contact")}
                                >
                                    Contact
                                </button>
                            </div>
                            {/* Address Information */}
                            {activeBtn === "address" && (
                                <div
                                    className={
                                        activeBtn === "address"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                        <div className="m-4 flex flex-wrap items-center">
                                            <div className="flex nowrap items-center w-[100%]">
                                                <div className="mr-1 w-[50%]">
                                                    <label>City</label>
                                                    <input
                                                        id="city"
                                                        type="text"
                                                        placeholder="Enter city"
                                                        className="form-input"
                                                        value={
                                                            values.city || ""
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    {errors.city && (
                                                        <div className="text-red-600 text-[14px]">
                                                            {errors.city}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="ml-1 w-[50%]">
                                                    <label>Country</label>
                                                    <input
                                                        id="country"
                                                        type="text"
                                                        placeholder="Enter Country"
                                                        className="form-input"
                                                        value={
                                                            values.country || ""
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    {errors.country && (
                                                        <div className="text-red-600 text-[14px]">
                                                            {errors.country}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="m-4">
                                            <div className="">
                                                <label>Post Code</label>
                                                <input
                                                    id="post_code"
                                                    type="number"
                                                    placeholder="Enter Post Code"
                                                    className="form-input"
                                                    value={
                                                        values.post_code || ""
                                                    }
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                                        <div className="m-4">
                                            <label>State</label>
                                            <input
                                                id="state"
                                                type="text"
                                                placeholder="Enter State"
                                                className="form-input"
                                                value={values.state || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="m-4">
                                            <label>address</label>
                                            <input
                                                id="address"
                                                type="text"
                                                placeholder="Enter address"
                                                className="form-input"
                                                value={values.address || ""}
                                                onChange={handleChange}
                                            />
                                            {errors.address && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.address}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Contact Information */}
                            {activeBtn === "contact" && (
                                <div
                                    className={
                                        activeBtn === "contact"
                                            ? "block"
                                            : "hidden"
                                    }
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="m-4">
                                            <label>Phone Number</label>
                                            <input
                                                id="phone_no"
                                                type="number"
                                                placeholder="Enter Phone Number"
                                                className="form-input"
                                                value={values.phone_no || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="m-4">
                                            <label>Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="Enter Email"
                                                className="form-input"
                                                value={values.email || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* old */}
                            {/* {false && (
                                <div className="">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="mx-4">
                                            <label>address</label>
                                            <input
                                                id="address"
                                                type="text"
                                                placeholder="Enter address"
                                                className="form-input"
                                                value={values.address || ""}
                                                onChange={handleChange}
                                            />
                                            {errors.address && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.address}
                                                </div>
                                            )}
                                        </div>
                                        <div className="mx-4">
                                            <div>
                                                <label>City</label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    placeholder="Enter city"
                                                    className="form-input"
                                                    value={values.city || ""}
                                                    onChange={handleChange}
                                                />
                                                {errors.city && (
                                                    <div className="text-red-600 text-[14px]">
                                                        {errors.city}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label>Country</label>
                                                <input
                                                    id="country"
                                                    type="text"
                                                    placeholder="Enter Country"
                                                    className="form-input"
                                                    value={values.country || ""}
                                                    onChange={handleChange}
                                                />
                                                {errors.country && (
                                                    <div className="text-red-600 text-[14px]">
                                                        {errors.country}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="mx-4">
                                            <label>Post Code</label>
                                            <input
                                                id="post_code"
                                                type="number"
                                                placeholder="Enter Post Code"
                                                className="form-input"
                                                value={values.post_code || ""}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mx-4">
                                            <label>Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="Enter Email"
                                                className="form-input"
                                                value={values.email || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="mx-4">
                                            <label>State</label>
                                            <input
                                                id="state"
                                                type="text"
                                                placeholder="Enter State"
                                                className="form-input"
                                                value={values.state || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mx-4">
                                            <label>Phone Number</label>
                                            <input
                                                id="phone_no"
                                                type="number"
                                                placeholder="Enter Phone Number"
                                                className="form-input"
                                                value={values.phone_no || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="mx-4">
                                            <label>Website</label>
                                            <input
                                                id="website"
                                                type="text"
                                                placeholder="Enter Website"
                                                className="form-input"
                                                value={values.website || ""}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mx-4">
                                            <label>Currency</label>
                                            <input
                                                id="currency"
                                                type="text"
                                                placeholder="Enter Currency"
                                                className="form-input"
                                                value={values.currency || ""}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )} */}
                            {/* <div>
                                <label className="flex items-center mt-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                    />
                                    <span className="text-white-dark">
                                        Check me out
                                    </span>
                                </label>
                            </div> */}
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
    <MainLayout children={page} title="HR || Edit Group Of Company" />
);

export default Edit;
