import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from "react-select";

function Edit() {
    const {  flash, companies, users, asset_type, result   } = usePage().props;
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        id:result?.id,
        company_id:result?.company_id,
        created_by:result?.created_by,
        product_name: result?.product_name,
        asset_type_id:result?.asset_type_id,
        model:result?.model,
        serial_no:result?.serial_no,
        office_tag_number:result?.office_tag_number,
        purchase_date:result?.purchase_date,
        purchase_quantity:result?.purchase_quantity,
        total_quantity:result?.total_quantity,
        purchase_price:result?.purchase_price,
        purchase_by:result?.purchase_by,
        warranty_info:result?.warranty_info,
        purchase_condition:result?.purchase_condition,
        destroy_date:result?.destroy_date,
        destroy_note:result?.destroy_note,
        details:result?.details,

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

    const user = users.map((user) => ({
        value: user?.id,
        label: user?.first_name ? `${user.first_name} ${user.last_name} - ${user.id}` : '',
    }));

    const handleSelectUser = (selectedOption) => {
        const  purchaseBy = selectedOption.value;
        console.log(purchaseBy);
        setValues((prevValues) => ({
            ...prevValues,
            purchase_by: purchaseBy,
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
        router.post("/admin/asset/update", values);
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
                            Asset
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
                            Asset
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
                                    <label>Asset Type Id<span className="text-red-600 ">*</span></label>
                                    <Select
                                        id="group_id"
                                        options={assetType}
                                        isSearchable={true}
                                        value={assetType.find(option => option.value === values.asset_type_id)}
                                        onChange={handleSelectAssetType}
                                        placeholder="Choose Option..."
                                    />

                                    {errors.company_id && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.company_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Product Name<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="product_name"
                                        type="text"
                                        placeholder="Product Name"
                                        className="form-input"
                                        value={values.product_name}
                                        onChange={handleChange}
                                    />
                                    {errors.product_name && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.product_name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Model<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="model"
                                        type="text"
                                        placeholder="Model"
                                        className="form-input"
                                        value={values.model}
                                        onChange={handleChange}
                                    />
                                    {errors.model && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.model}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Serial No<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="serial_no"
                                        type="text"
                                        placeholder="Serial No"
                                        className="form-input"
                                        value={values.serial_no}
                                        onChange={handleChange}
                                    />
                                    {errors.serial_no && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.serial_no}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Office Tag<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="office_tag_number"
                                        type="text"
                                        placeholder="Model"
                                        className="form-input"
                                        value={values.office_tag_number}
                                        onChange={handleChange}
                                    />
                                    {errors.office_tag_number && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.office_tag_number}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Purchase Date<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="purchase_date"
                                        type="date"
                                        placeholder="Purchase Date"
                                        className="form-input"
                                        value={values.purchase_date}
                                        onChange={handleChange}
                                    />
                                    {errors.purchase_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.purchase_date}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Purchase Quantity<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="purchase_quantity"
                                        type="text"
                                        placeholder="Purchase Quantity"
                                        className="form-input"
                                        value={values.purchase_quantity}
                                        onChange={handleChange}
                                    />
                                    {errors.purchase_quantity && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.purchase_quantity}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Total Quantity<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="total_quantity"
                                        type="text"
                                        placeholder="Total Quantity"
                                        className="form-input"
                                        value={values.total_quantity}
                                        onChange={handleChange}
                                    />
                                    {errors.total_quantity && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.total_quantity}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Purchase Price<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="purchase_price"
                                        type="text"
                                        placeholder="Purchase Price"
                                        className="form-input"
                                        value={values.purchase_price}
                                        onChange={handleChange}
                                    />
                                    {errors.purchase_price && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.purchase_price}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Purchase By<span className="text-red-600 ">*</span></label>
                                    <Select
                                        placeholder="Select an option"
                                        options={user}
                                        isSearchable={true}
                                        value={user.find(option => option.value === values.purchase_by)}
                                        // value={values.purchase_by}
                                        onChange={handleSelectUser}
                                    />
                                    {errors.purchase_by && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.purchase_by}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Warranty Info<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="warranty_info"
                                        type="text"
                                        placeholder="Warranty Info"
                                        className="form-input"
                                        value={values.warranty_info}
                                        onChange={handleChange}
                                    />
                                    {errors.warranty_info && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.warranty_info}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Purchase Condition<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="purchase_condition"
                                        type="text"
                                        placeholder="Purchase Condition"
                                        className="form-input"
                                        value={values.purchase_condition}
                                        onChange={handleChange}
                                    />
                                    {errors.purchase_condition && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.purchase_condition}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label>Destroy Date<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="destroy_date"
                                        type="date"
                                        placeholder="Destroy Date"
                                        className="form-input"
                                        value={values.destroy_date}
                                        onChange={handleChange}
                                    />
                                    {errors.destroy_date && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.destroy_date}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Destroy Note<span className="text-red-600 ">*</span></label>
                                    <input
                                        id="destroy_note"
                                        type="text"
                                        placeholder="Destroy Note"
                                        className="form-input"
                                        value={values.destroy_note}
                                        onChange={handleChange}
                                    />
                                    {errors.destroy_note && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.destroy_note}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Details<span className="text-red-600 ">*</span></label>

                                    <textarea
                                        id="details"
                                        placeholder="Enter Details"
                                        className="form-input"
                                        value={values.details || ''}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.details && (
                                        <div className="text-red-600 text-[14px]">
                                            {errors.details}
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
    <MainLayout children={page} title="HR || Edit Asset" />
);

export default Edit;
