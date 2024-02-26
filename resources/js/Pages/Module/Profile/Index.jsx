import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { DataTable } from "mantine-datatable";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";

function Index() {
    const { base_url, flash,user,errors } = usePage().props;
    const [tabs, setTabs] = useState('user-profile');
    const [image, setImage] = useState(user?.avatar ? `/storage/profile/${user.avatar}` : '/assets/images/user-profile.jpeg');

    const [values, setValues] = useState({
        id: user.id,
        first_name: user.first_name,
        last_name:user.last_name,
        mobile:user.mobile,
        email:user.email,
        gender:user.gender,
        blood_group:user?.personaldata?.blood_group,
        pr_address:user?.personaldata?.pr_address,
        pr_district:user?.personaldata?.pr_district,
        pr_police_station:user?.personaldata?.pr_police_station,
        pr_post_code:user?.personaldata?.pr_post_code,
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setValues({ ...values, image: file });
        }
    };
    const toggleTabs = (name) => {
        setTabs(name);
    };

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }


    const [password, setPassword] = useState({
        old_password:'',
        new_password:'',
        confirm_password:'',
    });

    function handleChangePassword(e) {
        const key = e.target.id;
        const value = e.target.value;
        setPassword((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post("/admin/user/profile/update", values);
    }

    function handleSubmitPassword(e) {
        e.preventDefault();
        router.post("/admin/user/profile/change-password", password);
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
                            Bank
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>

            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Profile Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('user-profile')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'user-profile' ? '!border-primary text-primary' : ''}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path
                                        opacity="0.5"
                                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M12 15L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Profile
                            </button>
                        </li>
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('password-change')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'password-change' ? '!border-primary text-primary' : ''}`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path
                                        d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                Password change
                            </button>
                        </li>

                    </ul>
                </div>
                {tabs === 'user-profile' ? (
                    <div>
                        <form onSubmit={handleSubmit} method="post" className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src={image} alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label>First Name</label>
                                        <input id="first_name"
                                               type="text"
                                               placeholder="First Name"
                                               className="form-input"
                                               value={values.first_name || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input id="last_name"
                                               type="text"
                                               placeholder="Last Name"
                                               className="form-input"
                                               value={values.last_name || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Phone</label>
                                        <input id="mobile"
                                               type="phone"
                                               placeholder="mobile"
                                               className="form-input"
                                               value={values.mobile || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <input id="email"
                                               type="email"
                                               placeholder="email"
                                               className="form-input"
                                               value={values.email || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Gender</label>
                                        <select id="gender" defaultValue={values.gender || ''}
                                                className="form-select text-white-dark" onChange={handleChange}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label>Blood Group</label>
                                        <select id="blood_group" defaultValue={values?.blood_group || ''}
                                                className="form-select text-white-dark" onChange={handleChange}>
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
                                        <label>Present Address</label>
                                        <input id="pr_address"
                                               type="text"
                                               placeholder="Present Address"
                                               className="form-input"
                                               value={values?.pr_address || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Present District</label>
                                        <input id="pr_district"
                                               type="text"
                                               placeholder="Present District"
                                               className="form-input"
                                               value={values?.pr_district || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Present Police Station</label>
                                        <input id="pr_police_station"
                                               type="text"
                                               placeholder="Present Police Station"
                                               className="form-input"
                                               value={values?.pr_police_station || ''}
                                               onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Present Post Code</label>
                                        <input id="pr_post_code"
                                               type="text"
                                               placeholder="Present Post Code"
                                               className="form-input"
                                               value={values?.pr_post_code || ''}
                                               onChange={handleChange}
                                        />
                                    </div>


                                    <div>
                                        <label>Image</label>
                                        <input id="image" type="file" placeholder="Jimmy@gmail.com"
                                               className="form-input" onChange={handleImageChange}/>
                                    </div>
                                    <div className="sm:col-span-2 mt-3">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ''
                )}
                {tabs === 'password-change' ? (
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
                            <div className="panel">
                                <div className="mb-5">
                                    <h5 className="font-semibold text-lg mb-4">Change Password</h5>
                                </div>
                                <div className="mb-5">
                                    <form onSubmit={handleSubmitPassword} method="post">
                                        <div className="mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <label>Old Password</label>
                                                <input id="old_password"
                                                       type="password"
                                                       placeholder="Enter Old Password"
                                                       className="form-input"
                                                       value={password.old_password}
                                                       onChange={handleChangePassword}
                                                />
                                                {errors.old_password && (
                                                    <div className="text-red-600 text-[14px]">
                                                        {errors.old_password}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label>New Password</label>
                                                <input id="new_password"
                                                       type="password"
                                                       placeholder="Enter New Password"
                                                       className="form-input"
                                                       value={password.new_password}
                                                       onChange={handleChangePassword}
                                                />
                                                {errors.new_password && (
                                                    <div className="text-red-600 text-[14px]">
                                                        {errors.new_password}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label>Confirm Password</label>
                                                <input id="confirm_password"
                                                       type="password"
                                                       placeholder="Enter Confirm Password"
                                                       className="form-input"
                                                       value={password.confirm_password}
                                                       onChange={handleChangePassword}
                                                />
                                                {errors.confirm_password && (
                                                    <div className="text-red-600 text-[14px]">
                                                        {errors.confirm_password}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary">
                                            Change Password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}

            </div>
        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || User Profile" />
);
export default Index;
