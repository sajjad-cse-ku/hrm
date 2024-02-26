import React, { useState,useEffect } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import Select from "react-select";

function Add() {
    const {  flash, user, department, designation, bank, company ,empProf } = usePage().props;
    // console.log(user);
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        user_id:empProf.user_id,
        company_id:company.id,
        created_by:"",
        basic:"",
        ot_basic:"",
        house_rent:"",
        medical:"",
        entertainment:"",
        conveyance:"",
        food:"",
        special_allowance:"",
        others_allowance:"",
        gross_salary:"",
        cash_salary:"",

        pf_own:"",
        income_tax:"",
        salary_advance:"",
        stamp_fee:"",
        punishment:"",

        bank_id:bank?.id,
        account_no:empProf.bank_acc_no,
        tds:"",

        other_deduction:"",
        other_deduction_details:"",

    });

    const [bankOptions, setBankOptions] = useState([]);
    useEffect(() => {
        if (Array.isArray(bank)) {
            const formattedBankOptions = bank.map((bankItem) => ({
                label: bankItem.name,
                value: bankItem.id,
            }));

            setBankOptions(formattedBankOptions);
        } else if (bank && typeof bank === 'object') {
            // Handle case when bank is a single object
            setBankOptions([{ label: bank.name, value: bank.id }]);
        }
    }, [bank]);

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
        router.post("/admin/salary-setups/store", values);

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
                            Salary Setup
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Add</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center gap-4 mb-5">
                        {/* <h5 className="font-semibold text-lg dark:text-white-light">
                            Salary Setup
                        </h5> */}
                        <div className="salary-setup-user-info">
                            <h5 className="font-semibold text-lg dark:text-white-light">{user.first_name} {user.last_name}</h5>
                            <h5 className="font-semibold text-lg dark:text-white-light">Id: LL-{
                                empProf?.joining_date && (
                                    new Date(empProf.joining_date)?.toLocaleDateString('en-US', { year: '2-digit', month: 'numeric' })
                                )
                            }-{user?.machine_user_id}</h5>
                        </div>
                        <div>
                            <h5 className="font-semibold text-lg dark:text-white-light">Department: {department.name}</h5>
                            <h5 className="font-semibold text-lg dark:text-white-light">Designation: {designation.name}</h5>
                        </div>
                    </div>
                    <form className="space-y-5" onSubmit={handleSubmit} method="post">
                            {/* Additions */}
                            <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="basis-[49%] custom-box-shadow p-4 rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Additions</h1>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <div>
                                            <label>Basic</label>
                                            <input
                                                id="basic"
                                                type="number"
                                                placeholder="Basic"
                                                className="form-input"
                                                value={values.basic}
                                                onChange={handleChange}
                                            />
                                            {errors.basic && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.basic}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>OT Basic</label>
                                            <input
                                                id="ot_basic"
                                                type="number"
                                                placeholder="OT Basic"
                                                className="form-input"
                                                value={values.ot_basic}
                                                onChange={handleChange}
                                            />
                                            {errors.ot_basic && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.ot_basic}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>House Rant</label>
                                            <input
                                                id="house_rent"
                                                type="number"
                                                placeholder="House Rant"
                                                className="form-input"
                                                value={values.house_rent}
                                                onChange={handleChange}
                                            />
                                            {errors.house_rent && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.house_rent}
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <div>
                                            <label>Medical</label>
                                            <input
                                                id="medical"
                                                type="number"
                                                placeholder="Medical"
                                                className="form-input"
                                                value={values.medical}
                                                onChange={handleChange}
                                            />
                                            {errors.medical && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.medical}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Entertainment</label>
                                            <input
                                                id="entertainment"
                                                type="number"
                                                placeholder="Entertainment"
                                                className="form-input"
                                                value={values.entertainment}
                                                onChange={handleChange}
                                            />
                                            {errors.entertainment && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.entertainment}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Conveyance</label>
                                            <input
                                                id="conveyance"
                                                type="number"
                                                placeholder="Conveyance"
                                                className="form-input"
                                                value={values.conveyance}
                                                onChange={handleChange}
                                            />
                                            {errors.conveyance && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.conveyance}
                                                </div>
                                            )}
                                        </div>

                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <div>
                                            <label>Special Allowance</label>
                                            <input
                                                id="special_allowance"
                                                type="number"
                                                placeholder="House Rant"
                                                className="form-input"
                                                value={values.special_allowance}
                                                onChange={handleChange}
                                            />
                                            {errors.special_allowance && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.special_allowance}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Others Allowance</label>
                                            <input
                                                id="others_allowance"
                                                type="number"
                                                placeholder="others"
                                                className="form-input"
                                                value={values.others_allowance}
                                                onChange={handleChange}
                                            />
                                            {errors.others_allowance && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.others_allowance}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Gross Salary</label>
                                            <input
                                                id="gross_salary"
                                                type="number"
                                                placeholder="Gross Salary"
                                                className="form-input"
                                                value={values.gross_salary}
                                                onChange={handleChange}
                                            />
                                            {errors.gross_salary && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.gross_salary}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Cash Salary</label>
                                            <input
                                                id="cash_salary"
                                                type="number"
                                                placeholder="Cash Salary"
                                                className="form-input"
                                                value={values.cash_salary}
                                                onChange={handleChange}
                                            />
                                            {errors.cash_salary && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.cash_salary}
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </div>

                              {/* Deduction */}
                                <div className="basis-[49%] custom-box-shadow p-4 rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Deduction</h1>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                        <div>
                                            <label>Income_Tax</label>
                                            <input
                                                id="income_tax"
                                                type="number"
                                                placeholder="Income Tax"
                                                className="form-input"
                                                value={values.income_tax}
                                                onChange={handleChange}
                                            />
                                            {errors.income_tax && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.income_tax}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>PF OWN</label>
                                            <input
                                                id="pf_own"
                                                type="number"
                                                placeholder="PF OWN"
                                                className="form-input"
                                                value={values.pf_own}
                                                onChange={handleChange}
                                            />
                                            {errors.pf_own && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.pf_own}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Stamp Fee</label>
                                            <input
                                                id="stamp_fee"
                                                type="number"
                                                placeholder="Stamp Fee"
                                                className="form-input"
                                                value={values.stamp_fee}
                                                onChange={handleChange}
                                            />
                                            {errors.stamp_fee && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.stamp_fee}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Food</label>
                                            <input
                                                id="food"
                                                type="number"
                                                placeholder="Food Cost"
                                                className="form-input"
                                                value={values.food}
                                                onChange={handleChange}
                                            />
                                            {errors.food && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.food}
                                                </div>
                                            )}
                                        </div>

                                    </div>


                                </div>

                                {/* Others Deduction */}
                                <div className="basis-[49%] custom-box-shadow p-4 rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Others Deduction</h1>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">

                                        <div>
                                            <label>Salary Advance</label>
                                            <input
                                                id="salary_advance"
                                                type="number"
                                                placeholder="Salary Advance"
                                                className="form-input"
                                                value={values.salary_advance}
                                                onChange={handleChange}
                                            />
                                            {errors.salary_advance && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.salary_advance}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Punishment</label>
                                            <input
                                                id="punishment"
                                                type="number"
                                                placeholder="Punishment"
                                                className="form-input"
                                                value={values.punishment}
                                                onChange={handleChange}
                                            />
                                            {errors.punishment && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.punishment}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Other Deduction</label>
                                            <input
                                                id="other_deduction"
                                                type="number"
                                                placeholder="Other Deduction"
                                                className="form-input"
                                                value={values.other_deduction}
                                                onChange={handleChange}
                                            />
                                            {errors.other_deduction && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.other_deduction}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label>Other Deduction Details</label>
                                            <input
                                                id="other_deduction_details"
                                                type="text"
                                                placeholder="Other Deduction Details"
                                                className="form-input"
                                                value={values.other_deduction_details}
                                                onChange={handleChange}
                                            />
                                            {errors.other_deduction_details && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.other_deduction_details}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>


                                {/* Banking Info */}

                                <div className="basis-[49%] custom-box-shadow p-4 rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Bank INFO</h1>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                        <div>
                                            <label>Bank</label>
                                            <input
                                                type="text"
                                                placeholder="Bank"
                                                className="form-input"
                                                value={bankOptions.find((option) => option.value === values.bank_id)?.label || ''}
                                                readOnly
                                            />
                                            <input
                                                type="hidden"
                                                id="bank_id"
                                                value={values.bank_id}
                                                onChange={handleChange}
                                            />
                                            {errors.bank_id && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.bank_id}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label>Bank Account</label>
                                            <input
                                                id="account_no"
                                                disabled
                                                type="text"
                                                placeholder="Bank Account"
                                                className="form-input"
                                                value={values.account_no}
                                                onChange={handleChange}
                                            />
                                            {errors.account_no && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.account_no}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label>TDS</label>
                                            <select
                                                className="form-select text-white-dark"
                                                defaultValue="N"
                                                id="tds"
                                            >
                                                <option value="N">Non TDS</option>
                                                <option value="T">TDS</option>
                                                <option value="C">Cons TDS</option>
                                            </select>
                                            {errors.tds && (
                                                <div className="text-red-600 text-[14px]">
                                                    {errors.tds}
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                </div>

                                <div className=" mt-6 col-span-2 flex justify-end ">
                                    <button type="submit" className="btn btn-primary ">
                                        Submit
                                    </button>
                                </div>

                            </div>


                        </form>
                </div>
            </div>
        </>
    );
}

Add.layout = (page) => (
    <MainLayout children={page} title="HR || Add Designation"/>
);

export default Add;
