import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from "react-select";

function Edit() {
    const {  flash, companies, users, asset_type, result,asset   } = usePage().props;
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        id:result?.id,
        employee_id: result?.employee_id,
        asset_type_id: result?.asset_type_id,
        asset_id:result?.asset_id,
        assigned_by:result?.assigned_by,
        created_by:result?.created_by,
        assigned_date:result?.assigned_date,
        return_date:result?.return_date,
        return_condition:result?.return_condition,
        return_reason:result?.return_reason,
        location:result?.location,
        approval_note:result?.approval_note,
        description:result?.description,

    });

    const assetType = asset_type.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const handleSelectAssetType = (selectedOption) => {
        const assetTypeId = selectedOption.value;
        setValues((prevValues) => ({
            ...prevValues,
            asset_type_id: assetTypeId,
        }));
    };

    const assetId = asset.map((item) => ({
        value: item.id,
        label: item.product_name,
    }));

    const handleSelectAsset = (selectedOption) => {
        const assetId = selectedOption.value;
        setValues((prevValues) => ({
            ...prevValues,
            asset_id: assetId,
        }));
    };

    const employee = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} - ${user.id}` : '',
    }));

    const handleSelectEmployee = (selectedOption) => {
        const  employeeId = selectedOption.value;
        setValues((prevValues) => ({
            ...prevValues,
            employee_id: employeeId,
        }));
    };

    const assignedBy = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} - ${user.id}` : '',
    }));

    const handleSelectAssignedBy = (selectedOption) => {
        const  assignedBy = selectedOption.value;
        setValues((prevValues) => ({
            ...prevValues,
            assigned_by: assignedBy,
        }));
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
        // console.log(values);
        router.post("/admin/asset-assigned/update", values);
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
                            Asset Assigned
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
                            Asset Assigned Edit
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form
                            className="space-y-5"
                            onSubmit={handleSubmit}
                            method="post"
                        >
                            <input
                                id="id"
                                type="hidden"
                                value={result?.id}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Asset Type<span className="text-red-600 ">*</span></label>
                                    <Select
                                        id="group_id"
                                        options={assetType}
                                        isSearchable={true}
                                        value={assetType.find(option => option.value === values.asset_type_id)}
                                        onChange={handleSelectAssetType}
                                        placeholder="Choose Option..."
                                    />

                                    {errors.asset_type_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.asset_type_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Asset<span className="text-red-600 ">*</span></label>
                                    <Select
                                        id="group_id"
                                        options={assetId}
                                        isSearchable={true}
                                        value={assetId.find(option => option.value === values.asset_id)}
                                        onChange={handleSelectAsset}
                                        placeholder="Choose Option..."
                                    />

                                    {errors.asset_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.asset_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Employee<span className="text-red-600 ">*</span></label>
                                    <Select
                                        id="group_id"
                                        options={employee}
                                        isSearchable={true}
                                        value={employee.find(option => option.value === values.employee_id)}
                                        onChange={handleSelectEmployee}
                                        placeholder="Choose Option..."
                                    />

                                    {errors.employee_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.employee_id}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Assigned By<span className="text-red-600 ">*</span></label>
                                    <Select
                                        id="group_id"
                                        options={assignedBy}
                                        isSearchable={true}
                                        value={employee.find(option => option.value === values.assigned_by)}
                                        onChange={handleSelectAssignedBy}
                                        placeholder="Choose Option..."
                                    />

                                    {errors.asset_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.asset_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Assigned Date<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="assigned_date"
                                        type="date"
                                        className="form-input"
                                        value={values.assigned_date}
                                        onChange={handleChange}
                                    />
                                    {errors.assigned_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.assigned_date}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Return Date<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="return_date"
                                        type="date"
                                        className="form-input"
                                        value={values.return_date}
                                        onChange={handleChange}
                                    />
                                    {errors.return_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.return_date}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Return Condition<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="return_condition"
                                        type="text"
                                        placeholder="Return Condition"
                                        className="form-input"
                                        value={values.return_condition}
                                        onChange={handleChange}
                                    />
                                    {errors.return_condition && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.return_condition}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Return Reason<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="return_reason"
                                        type="text"
                                        placeholder="Total Quantity"
                                        className="form-input"
                                        value={values.return_reason}
                                        onChange={handleChange}
                                    />
                                    {errors.return_reason && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.return_reason}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Location<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="location"
                                        type="text"
                                        placeholder="Location"
                                        className="form-input"
                                        value={values.location}
                                        onChange={handleChange}
                                    />
                                    {errors.location && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.location}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Approval Note<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="approval_note"
                                        type="text"
                                        placeholder="Approval Note"
                                        className="form-input"
                                        value={values.approval_note}
                                        onChange={handleChange}
                                    />
                                    {errors.approval_note && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.approval_note}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Details<span className="text-red-600 ">*</span></label>

                                    <textarea
                                        id="description"
                                        placeholder="Enter Description"
                                        className="form-input"
                                        value={values.description || ''}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.description && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.description}
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

Edit.layout = (page) => (
    <MainLayout children={page} title="HR || Edit Asset Assigned" />
);

export default Edit;
