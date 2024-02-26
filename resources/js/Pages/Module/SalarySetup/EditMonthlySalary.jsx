import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";

import "react-quill/dist/quill.snow.css";
import FlashMessage from "../../Component/FlashMessage.jsx";
import { useForm, Controller } from "react-hook-form";


function EditMonthlySalary() {
    const { flash, result, bank, salaryMonthName, salaryYear } = usePage().props;
    const [earnedSalary, setEarnedSalary] = useState(result.earned_salary);

    function handlePaidDaysChange(event) {
        const value = event.target.value;

        if (result.paid_days > 0) {
            let newEarnedSalary = (result.earned_salary / result.paid_days) * value;
            let roundedNumber = Math.ceil(newEarnedSalary * 100) / 100;

            newEarnedSalary = roundedNumber.toFixed(2);

            setEarnedSalary(newEarnedSalary);
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            id: result.id,
            advance: result?.advance,
            arear_amount: result?.arear_amount,
            basic: result?.basic,
            // cash_salary: result?.cash_salary,
            conveyance: result?.conveyance,
            paid_days: result?.paid_days,
            earned_salary: earnedSalary,
            entertainment: result?.entertainment,
            // final: result?.final,
            food_charge: result?.food_charge,
            gross_salary: result?.gross_salary,
            house_rent: result?.house_rent,
            income_tax: result?.income_tax,
            increment_amt: result?.increment_amt,
            medical: result?.medical,
            mobile_others: result?.mobile_others,
            // net_salary: result?.net_salary,
            other_allowance: result?.other_allowance,
            // payable_salary: result?.payable_salary,
            stamp_fee: result?.stamp_fee,
            withheld: result?.withheld,
            // remarks: result?.remarks,
            reason: result?.reason,
        }
    });
    function onSubmit(data) {
        router.post("/admin/edit-monthly-salary-update", data);
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
                            Monthly Salary
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Edit</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">

                    <div className="flex items-center gap-4 mb-5">
                        {/* <h5 className="font-semibold text-lg dark:text-white-light">
                            Designation
                        </h5> */}

                        <div className="salary-setup-user-info">
                            <h5 className="font-semibold text-lg dark:text-white-light">{result.user.first_name} {result.user.last_name}</h5>
                            <h5 className="font-semibold text-lg dark:text-white-light">Id: LL-{
                                result.user.professionaldata?.joining_date && (
                                    new Date(result.user.professionaldata.joining_date)?.toLocaleDateString('en-US', { year: '2-digit', month: 'numeric' })
                                )
                            }-{result.user?.machine_user_id}</h5>
                        </div>
                        <div className="salary-setup-user-info">
                            <h5 className="font-semibold text-lg dark:text-white-light">Department: {result.user.professionaldata.department.name}</h5>
                            <h5 className="font-semibold text-lg dark:text-white-light">Designation: {result.user.professionaldata.designation.name}</h5>
                        </div>
                        <div>
                            <h5 className="font-semibold text-lg dark:text-white-light">Salary Month: {salaryMonthName}</h5>
                            <h5 className="font-semibold text-lg dark:text-white-light">Salary Year: {salaryYear}</h5>
                        </div>
                    </div>

                    <div className="mb-5">
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} method="post">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="hidden"
                                    {...register("id")}
                                />
                                <div className="p-[18px] custom-box-shadow rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Additions</h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label>Medical</label>
                                            <input
                                                {...register("medical")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter medical "
                                            />
                                        </div>
                                        <div>
                                            <label>Basic</label>
                                            <input
                                                {...register("basic")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter basic "
                                            />
                                        </div>
                                        {/* <div>
                                            <label>Cash Salary</label>
                                            <input
                                                {...register("cash_salary")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter cash_salary "
                                            />
                                        </div> */}
                                        <div>
                                            <label>Gross Salary</label>
                                            <input
                                                {...register("gross_salary")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter gross_salary "
                                            />
                                        </div>
                                        <div>
                                            <label>Other Allowance</label>
                                            <input
                                                {...register("other_allowance")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter other_allowance "
                                            />
                                        </div>
                                        <div>
                                            <label>Conveyance</label>
                                            <input
                                                {...register("conveyance")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter conveyance "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-[18px] custom-box-shadow rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Deduction</h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label>Food Charge</label>
                                            <input
                                                {...register("food_charge")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter food_charge "
                                            />
                                        </div>
                                        <div>
                                            <label>Income Tax</label>
                                            <input
                                                {...register("income_tax")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter income_tax "
                                            />
                                        </div>
                                        {/*<div>*/}
                                        {/*    <label>mobile_others</label>*/}
                                        {/*    <input*/}
                                        {/*        {...register("mobile_others")}*/}
                                        {/*        type="text"*/}
                                        {/* disabled */}
                                        {/*        className="form-input"*/}
                                        {/*        placeholder="Enter mobile_others "*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <div>
                                            <label>Stamp Fee</label>
                                            <input
                                                {...register("stamp_fee")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter stamp_fee "
                                            />
                                        </div>
                                        <div>
                                            <label>Arear Amount</label>
                                            <input
                                                {...register("arear_amount")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter arear_amount Name"
                                            />
                                        </div>
                                        <div>
                                            <label>Advance</label>
                                            <input
                                                {...register("advance")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter Category Name"
                                            />
                                        </div>
                                        <div>
                                            <label>Increment Amount</label>
                                            <input
                                                {...register("increment_amt")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter increment_amt "
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="p-[18px] custom-box-shadow rounded-lg">
                                    <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Others Deduction</h1>
                                    <div className="grid grid-cols-2 gap-4"> */}
                                {/* <div>
                                            <label>Cash Salary</label>
                                            <input
                                                {...register("cash_salary")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter cash_salary "
                                            />
                                        </div> */}
                                {/* <div>
                                            <label>Net Salary</label>
                                            <input
                                                {...register("net_salary")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter net_salary "
                                            />
                                        </div> */}
                                {/* <div>
                                            <label>Final</label>
                                            <input
                                                {...register("final")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter final "
                                            />
                                        </div> */}
                                {/* <div>
                                            <label>Payable Salary</label>
                                            <input
                                                {...register("payable_salary")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter payable_salary "
                                            />
                                        </div> */}
                                {/* </div>
                                </div> */}
                            </div>

                            <div className="p-[18px] custom-box-shadow rounded-lg">
                                <h1 className="font-semibold text-lg dark:text-white-light mb-4 custom-border-bottom pb-2">Update Salary</h1>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label>Paid Days</label>
                                        <input
                                            {...register("paid_days")}
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter paid days "
                                            onChange={handlePaidDaysChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Earned Salary</label>
                                        <input
                                            {...register("earned_salary")}
                                            type="text"
                                            disabled
                                            className="form-input"
                                            placeholder="Enter earned_salary "
                                            value={earnedSalary}
                                        />
                                    </div>
                                    <div>
                                        <label>Withheld</label>
                                        <select
                                            className="form-select text-white-dark"
                                            defaultValue="0"
                                            {...register("withheld")}
                                        >
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                    {/* <div>
                                            <label>Remarks</label>
                                            <input
                                                {...register("remarks")}
                                                type="text"
                                                disabled
                                                className="form-input"
                                                placeholder="Enter remarks "
                                            />
                                        </div> */}
                                    <div>
                                        <label>Reason</label>
                                        <textarea
                                            className="form-select text-white-dark"
                                            {...register("reason")}
                                        >
                                        </textarea>
                                    </div>
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

EditMonthlySalary.layout = (page) => (
    <MainLayout children={page} title="HR || Edit Salary Setup" />
);

export default EditMonthlySalary;
