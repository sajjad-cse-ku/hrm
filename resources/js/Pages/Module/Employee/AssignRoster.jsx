import React, {useEffect, useState} from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage.jsx";
import {Controller, useForm} from "react-hook-form";
import Select from 'react-select';
function AssignRoster() {
    const {  flash ,days_name_array,user_id } = usePage().props;
    const { control,register, handleSubmit,setValue,formState: { errors } } = useForm();

    const days = [
        {
            id: 'sat',
            label: "sat"
        },
        {
            id: 'sun',
            label: "sun"
        },
        {
            id: 'mon',
            label: "mon"
        },
        {
            id: 'tue',
            label: "tue"
        },
        {
            id: 'wed',
            label: "wed"
        },
        {
            id: 'thu',
            label: "thu"
        },
        {
            id: 'fri',
            label: "fri"
        },
    ];

    const assign_days = days.map((item) => ({
        value: item?.id,
        label: item?.label,
    }));
    const [selectedDays, setSelectedDays] = useState(days_name_array);
    useEffect(() => {
        setValue('days', selectedDays);
    }, [selectedDays, setValue]);
    function onSubmit(data) {
        // console.log(data);
        router.post("/admin/assign-roster/store/"+user_id, data);
    }
    return (
        <>
            <FlashMessage flash={flash} />
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 ">
                <div className="rounded-full bg-[#ff6243] p-1.5 text-white ring-2 ring-[#ff6243] ltr:mr-3 rtl:ml-3 h-[35px] w-[35px] flex items-center justify-center">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                <ul className="flex items-center space-x-2 rtl:space-x-reverse">
                    <li>
                        <Link href="#" className="text-[#FF6243] text-[19px] font-bold hover:underline text-base">
                            Roster
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2 text-base">
                        <span>Add</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <div className="panel" id="forms_grid">
                    <div className="flex items-center mb-5 ">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Roster Information
                        </h5>
                    </div>
                    <div className="mb-5">
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} method="post">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div className="md:col-span-2">
                                    <label>Assigned Roster<span className="text-red-600 ">*</span></label>
                                    <div className="flex items-center gap-2">
                                        <Controller
                                            control={control}
                                            {...register("days")}
                                            render={({ field }) =>(
                                                <Select
                                                    className="w-full"
                                                    placeholder="Select an option"
                                                    options={assign_days}
                                                    isMulti
                                                    isSearchable={true}
                                                    value={selectedDays && selectedDays.length > 0 ? assign_days.filter(option => selectedDays.includes(option.value)) : ''}
                                                    onChange={(selectedOptions) => {
                                                        const selectedValues = selectedOptions.map((option) => option.value);
                                                        setSelectedDays(selectedValues);
                                                        field.onChange(selectedValues); // This should trigger the form update
                                                    }}
                                                />
                                            )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary !mt-6 bg-[#ff6243] border-[#ff6243] text-base"
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

AssignRoster.layout = (page) => (
    <MainLayout children={page} title="My Student || Add Student" />
);

export default AssignRoster;
