import React, { useState, Fragment } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Tab } from '@headlessui/react';
import FlashMessage from "../../Component/FlashMessage.jsx";
import { useForm  } from "react-hook-form";
import axios from 'axios'; // Import Axios

function Add()
{
    const {  flash,companies,users,titles,religions,bangladesh,department,section,designation,working_status,banks } = usePage().props;
    const { register, handleSubmit,setValue,formState: { errors } } = useForm();

    const [presentThana, setPresentThana] = useState([]);
    const [parmanentThana, setParmanentThana] = useState([]);
    const [mailingThana, setMailingThana] = useState([]);
    const [isSection, setSection] = useState([]);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            // Set the selected image file to state
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const presentDistrictSelect =  async (name) => {
        try {
            const response = await axios.get('/admin/get-thana/'+name);
            setPresentThana(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const presentThanaSelect =  async (name) => {
        try {
            const response = await axios.get('/admin/get-post-code/'+name);
            setValue('pr_post_code', response.data.post_code);
        } catch (error) {
            console.error(error);
        }
    };


    const parmanentDistrictSelect =  async (name) => {
        try {
            const response = await axios.get('/admin/get-thana/'+name);
            setParmanentThana(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const parmanentThanaSelect =  async (name) => {
        try {
            const response = await axios.get('/admin/get-post-code/'+name);
            setValue('pm_post_code', response.data.post_code);
        } catch (error) {
            console.error(error);
        }
    };

    const mailingDistrictSelect =  async (name) => {
        try {
            const response = await axios.get('/admin/get-thana/'+name);
            setMailingThana(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const mailingThanaSelect =  async (name) => {
        try {
            const response = await axios.get('/admin/get-post-code/'+name);
            setValue('m_post_code', response.data.post_code);
        } catch (error) {
            console.error(error);
        }
    };

    const sectionSelect =  async (id) => {
        try {
            const response = await axios.get('/admin/section-select/'+id);
            setSection(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    function onSubmit(data) {
        router.post("/admin/employee/store", data);
    }

    // const tableData = [
    //     {
    //         id: 1,
    //         name: 'John Doe',
    //         email: 'johndoe@yahoo.com',
    //         date: '10/08/2020',
    //         sale: 120,
    //         status: 'Complete',
    //         register: '5 min ago',
    //         progress: '40%',
    //         position: 'Developer',
    //         office: 'London',
    //     },
    //     {
    //         id: 2,
    //         name: 'Shaun Park',
    //         email: 'shaunpark@gmail.com',
    //         date: '11/08/2020',
    //         sale: 400,
    //         status: 'Pending',
    //         register: '11 min ago',
    //         progress: '23%',
    //         position: 'Designer',
    //         office: 'New York',
    //     },
    //     {
    //         id: 3,
    //         name: 'Alma Clarke',
    //         email: 'alma@gmail.com',
    //         date: '12/02/2020',
    //         sale: 310,
    //         status: 'In Progress',
    //         register: '1 hour ago',
    //         progress: '80%',
    //         position: 'Accountant',
    //         office: 'Amazon',
    //     },
    //     {
    //         id: 4,
    //         name: 'Vincent Carpenter',
    //         email: 'vincent@gmail.com',
    //         date: '13/08/2020',
    //         sale: 100,
    //         status: 'Canceled',
    //         register: '1 day ago',
    //         progress: '60%',
    //         position: 'Data Scientist',
    //         office: 'Canada',
    //     },
    // ];

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
                            Employee
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Add</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="panel" id="forms_grid">
                        <Tab.Group>
                            <Tab.List className="flex flex-wrap">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >Employee Credential Information</button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >Employee Personal Information</button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''} relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                        >Employee Professional Information</button>
                                    )}
                                </Tab>
                            </Tab.List>

                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="active pt-5">
                                        <div className="mb-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label>First Name<span className="text-red-600 ">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter First Name"
                                                        {...register("first_name", { required: "First Name is required" })}
                                                    />
                                                    {errors.first_name && (
                                                        <span className="text-red-600 text-[14px] pt-3">
                                                                {errors.first_name.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>Last Name<span className="text-red-600 ">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Last Name"
                                                        {...register("last_name", { required: "Last Name is required" })}
                                                    />
                                                    {errors.last_name && (
                                                        <span className="text-red-600 text-[14px] pt-3">
                                                                {errors.last_name.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>Email<span className="text-red-600 ">*</span></label>
                                                    <input
                                                        type="email"
                                                        className="form-input
                                                        {`${errors.email && 'is-invalid'}`}"
                                                        {...register("email",
                                                            {
                                                                required:"Email is required",
                                                                pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email'}
                                                            })} placeholder="name@example.com" />
                                                    {errors.email && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.email.message}
                                                            </span>
                                                    )}
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label>Machine User ID<span className="text-red-600 ">*</span></label>
                                                    <input
                                                        type="number"
                                                        className="form-input"
                                                        placeholder="Enter Machine User ID"
                                                        {...register("machine_user_id", { required: "Machine User ID is required" })}
                                                    />
                                                    {errors.machine_user_id && (
                                                        <span className="text-red-600 text-[14px] pt-3">
                                                                {errors.machine_user_id.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>Mobile</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Mobile Number"
                                                        {...register("mobile")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Gender
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("gender")}
                                                        defaultValue="Male"
                                                    >
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div>
                                                    <label>Date Of Birth ID</label>
                                                    <input
                                                        type="date"
                                                        className="form-input"
                                                        {...register("date_of_birth")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Avatar</label>
                                                    <input
                                                        type="file"
                                                        className="form-input"
                                                        {...register("avatar")}
                                                        onChange={handleImageChange} // Handle file selection
                                                    />
                                                </div>
                                                <div>
                                                    {selectedImage && (
                                                        <img
                                                            src={selectedImage}
                                                            alt="Selected Avatar"
                                                            style={{ maxWidth: '100px' }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="pt-5">
                                        <div className="mb-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                <div>
                                                    <label>
                                                        Company Name
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("company_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {companies.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>
                                                        Title
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("title_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {titles.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>
                                                        Religion
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("religion_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {religions.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label>Signature</label>
                                                    <input
                                                        type="file"
                                                        className="form-input"
                                                        {...register("signature")}
                                                    />
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                                <div>
                                                    <label>Father Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="First Name"
                                                        className="form-input"
                                                        {...register("father_name")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Mother Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Mother Name"
                                                        className="form-input"
                                                        {...register("mother_name")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Spouse Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Spouse Name"
                                                        className="form-input"
                                                        {...register("spouse_name")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>National Id</label>
                                                    <input
                                                        type="text"
                                                        placeholder="National Id"
                                                        className="form-input"
                                                        {...register("national_id")}
                                                    />
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                                <div>
                                                    <label>Present Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Present Address"
                                                        className="form-input"
                                                        {...register("pr_address")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Present District<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("pr_district",{ required: "Present District is required" })}
                                                        onChange={(e) => presentDistrictSelect(e.target.value)}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {bangladesh.map((item) => (
                                                            <option
                                                                key={item.district}
                                                                value={item.district}
                                                            >
                                                                {item.district}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.pr_district && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.pr_district.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Present Police Station<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("pr_police_station",{ required: "Present Police Station is required" })}
                                                        onChange={(e) => presentThanaSelect(e.target.value)}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {presentThana.map((item) => (
                                                            <option
                                                                key={item.thana + '-' + item.post_office}
                                                                value={item.thana + '-' + item.post_office}
                                                            >
                                                                {item.thana + '-' + item.post_office}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.pr_police_station && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.pr_police_station.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Present Post Code<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Present Post Code"
                                                        className="form-input"
                                                        // value={presentPostCode}
                                                        {...register("pr_post_code",{ required: "Present Post Code is required" })}
                                                    />
                                                    {errors.pr_post_code && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.pr_post_code.message}
                                                            </span>
                                                    )}
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                                <div>
                                                    <label>Permanent Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Permanent Address"
                                                        className="form-input"
                                                        {...register("pm_address")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Permanent District<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("pm_district",{ required: "Permanent District is required" })}
                                                        onChange={(e) => parmanentDistrictSelect(e.target.value)}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {bangladesh.map((item) => (
                                                            <option
                                                                key={item.district}
                                                                value={item.district}
                                                            >
                                                                {item.district}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.pm_district && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.pm_district.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Permanent Police Station<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("pm_police_station",{ required: "Permanent Police Station is required" })}
                                                        onChange={(e) => parmanentThanaSelect(e.target.value)}

                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {parmanentThana.map((item) => (
                                                            <option
                                                                key={item.thana + '-' + item.post_office}
                                                                value={item.thana + '-' + item.post_office}
                                                            >
                                                                {item.thana + '-' + item.post_office}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.pm_police_station && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.pm_police_station.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Permanent Post Code<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Permanent Post Code"
                                                        className="form-input"
                                                        // value={parmanentPostCode}
                                                        {...register("pm_post_code",{ required: "Permanent Post Code is required" })}
                                                    />
                                                    {errors.pm_post_code && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.pm_post_code.message}
                                                            </span>
                                                    )}
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                                <div>
                                                    <label>Mailing Address</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Mailing Address"
                                                        className="form-input"
                                                        {...register("m_address")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Mailing District<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("m_district",{ required: "Mailing District is required" })}
                                                        onChange={(e) => mailingDistrictSelect(e.target.value)}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {bangladesh.map((item) => (
                                                            <option
                                                                key={item.district}
                                                                value={item.district}
                                                            >
                                                                {item.district}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.m_district && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.m_district.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Mailing Police Station<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("m_police_station",{ required: "Mailing Police Station is required" })}
                                                        onChange={(e) => mailingThanaSelect(e.target.value)}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {mailingThana.map((item) => (
                                                            <option
                                                                key={item.thana + '-' + item.post_office}
                                                                value={item.thana + '-' + item.post_office}
                                                            >
                                                                {item.thana + '-' + item.post_office}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.m_police_station && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.m_police_station.message}
                                                            </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Mailing Post Code<span className="text-red-600 ">*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Permanent Post Code"
                                                        className="form-input"
                                                        // value={mailingPostCode}
                                                        {...register("m_post_code",{ required: "Mailing Post Code is required" })}
                                                    />
                                                    {errors.m_post_code && (
                                                        <span className="text-red-600 text-[14px]">
                                                                {errors.m_post_code.message}
                                                            </span>
                                                    )}
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                                <div>
                                                    <label>Last Education</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Last Education"
                                                        className="form-input"
                                                        {...register("last_education")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Blood Group Name
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("blood_group")}
                                                        defaultValue="A+"
                                                    >
                                                        <option value="A+">A+</option>
                                                        <option value="A-">A-</option>
                                                        <option value="B+">B+</option>
                                                        <option value="B-">B-</option>
                                                        <option value="O+">O+</option>
                                                        <option value="O-">O-</option>
                                                        <option value="AB+">AB+</option>
                                                        <option value="AB-">AB-</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Prof Speciality</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Prof Speciality"
                                                        className="form-input"
                                                        {...register("prof_speciality")}
                                                    />
                                                </div>
                                                {/* <div>
                                                    <label>
                                                        Is Printed
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("is_printed")}
                                                        defaultValue="1"
                                                    >
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
                                                    </select>
                                                </div> */}

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">

                                                <div>
                                                    <label>Biography</label>

                                                    <textarea
                                                        placeholder="Biography"
                                                        className="form-input"
                                                        {...register("biography")}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className="pt-5">
                                        <div className="mb-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                {/* <div>
                                                    <label>
                                                        Department
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("department_id")}
                                                        onChange={(e) => sectionSelect(e.target.value)}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {department.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>
                                                        Section
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("section_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {isSection.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div> */}
                                                <div>
                                                    <label>
                                                        Designation
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("designation_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {designation.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label>
                                                        Working Status
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("working_status_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {working_status.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label>
                                                        Bank Name
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("bank_id")}
                                                    >
                                                        <option value="">Choose Option...</option>
                                                        {banks.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Pf No</label>
                                                    <input
                                                        type="number"
                                                        className="form-input"
                                                        placeholder="Enter Pf No"
                                                        value="0"
                                                        {...register("pf_no")}
                                                    />
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                {/* <div>
                                                    <label>
                                                        Report To
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("report_to")}
                                                    >
                                                        {users.map((item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.first_name} - {item.id}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div> */}

                                                <div>
                                                    <label>Joining Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-input"
                                                        {...register("joining_date")}
                                                    />
                                                </div>

                                                <div>
                                                    <label>
                                                        Overtime
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("overtime")}
                                                        defaultValue="0"
                                                    >
                                                        <option value="1">Overtime Eligibility</option>
                                                        <option value="0">Overtime Not Eligibility</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Overtime Note</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Overtime Note"
                                                        {...register("overtime_note")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Transport
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("transport")}
                                                        defaultValue="0"
                                                    >
                                                        <option value="1">Transport Eligibility</option>
                                                        <option value="0">Transport Not Eligibility</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                <div>
                                                    <label>Transport Note</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Overtime Note"
                                                        {...register("transport_note")}
                                                    />
                                                </div>
                                                <div>
                                                    <label>
                                                        Late Allow
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("late_allow")}
                                                        defaultValue="0"
                                                    >
                                                        <option value="1">Late Allow Eligibility</option>
                                                        <option value="0">Late Allow Not Eligibility</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>
                                                        Pay Schale
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("pay_schale")}
                                                        defaultValue="0"
                                                    >
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Pay Grade</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Overtime Note"
                                                        {...register("pay_grade")}
                                                    />
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                                <div>
                                                    <label>Bank Acc No</label>
                                                    <input
                                                        type="text"
                                                        className="form-input"
                                                        placeholder="Enter Bank Acc No"
                                                        {...register("bank_acc_no")}
                                                    />
                                                </div>
                                                {/* <div>
                                                    <label>
                                                        Confirm Probation
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("confirm_probation")}
                                                        defaultValue="P"
                                                    >
                                                        <option value="3">P</option>
                                                        <option value="6">A</option>
                                                    </select>
                                                </div> */}
                                                <div>
                                                    <label>
                                                        Confirm Period
                                                    </label>
                                                    <select
                                                        className="form-select text-white-dark"
                                                        {...register("confirm_period")}
                                                        defaultValue="3"
                                                    >
                                                        <option value="3">3 Months</option>
                                                        <option value="6">6 Months</option>
                                                        <option value="12">12 Months</option>
                                                    </select>
                                                </div>
                                                {/* <div>
                                                    <label>Status Change Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-input"
                                                        {...register("status_change_date")}
                                                    />
                                                </div> */}

                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
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
        </>
    );
}

Add.layout = (page) => (
    <MainLayout children={page} title="HR || Add Employee" />
);

export default Add;
