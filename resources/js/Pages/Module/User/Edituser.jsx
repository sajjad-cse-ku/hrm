import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import avatarImage from "../../../../images/avatar.png";
import { LuUploadCloud } from "react-icons/lu";

function Edituser() {
    const { user, roles, permissions, currentuser, rolewisepermission } =
        usePage().props;

    // console.log();

    const userpermission = user.permissioninfo.map(
        (permission) => permission.permission_id
    );
    const userselectedroles = user.roleinfo.map((role) => role.role_id);
    const rolebasedPermission = user.rolebasedpermissioninfo;
    const hasRoleBasedPermissions = user.hasRoleBasedPermissions;

    // console.log(userselectedroles);

    // Assuming rolewisepermission is the object you want to convert
    const rolewisepermissionArray = Object.keys(rolewisepermission).map(
        (roleId) => {
            return {
                roleId: parseInt(roleId), // Convert the roleId to an integer
                permissions: Object.keys(rolewisepermission[roleId]).map(
                    (permissionId) => {
                        return {
                            permissionId: parseInt(permissionId), // Convert the permissionId to an integer
                            permission_name:
                                rolewisepermission[roleId][permissionId],
                        };
                    }
                ),
            };
        }
    );

    const [selectAllPermissions, setSelectAllPermissions] = useState({});
    const [image, setImage] = useState(user.avatar || avatarImage);
    const [activeBtn, setActiveBtn] = useState("Common User");

    const [formData, setFormData] = useState({
        userid: user.id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        status: user.status,
        mobile: user.mobile,
        gender: user.gender,
        dateOfBirth: user.date_of_birth,
        avatar: user.avatar || avatarImage,
        password: "",
        selectedPermissions: userpermission,
        roleBasedPermissions: hasRoleBasedPermissions,
        selectedRoles: [],
    });

    const handlePermissionChange = (permissionID, checked) => {
        if (checked) {
            setFormData((prevData) => ({
                ...prevData,
                selectedPermissions: [
                    ...prevData.selectedPermissions,
                    permissionID,
                ],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                selectedPermissions: prevData.selectedPermissions.filter(
                    (id) => id !== permissionID
                ),
            }));
        }
    };
    const handleRoleBasedPermissionChange = (roleId, permissionID, checked) => {
        setFormData((prevData) => {
            const { roleBasedPermissions } = prevData;

            // Create a copy of the selected permissions array for the role (or initialize an empty array)
            const rolePermissions = roleBasedPermissions[roleId] || [];

            // Update the selected permissions for the role based on the checked status

            const updatedRolePermissions = checked
                ? [...rolePermissions, permissionID]
                : rolePermissions.filter((id) => id !== permissionID);

            // Update the roleBasedPermissions object with the updated array
            return {
                ...prevData,
                roleBasedPermissions: {
                    ...roleBasedPermissions,
                    [roleId]: updatedRolePermissions,
                },
            };
        });
    };

    const handleRoleChange = (roleId, checked) => {
        if (checked) {
            setFormData((prevData) => ({
                ...prevData,
                selectedRoles: [...prevData.selectedRoles, roleId],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                selectedRoles: prevData.selectedRoles.filter(
                    (id) => id !== roleId
                ),
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData);
        router.post("/admin/users/update", formData);
    };

    const handleSelectAllPermissions = (roleId, checked) => {
        setSelectAllPermissions((prevSelectAllPermissions) => ({
            ...prevSelectAllPermissions,
            [roleId]: checked,
        }));

        if (checked) {
            // Select all permissions for the role
            const allPermissions = rolewisepermissionArray
                .find((roleData) => roleData.roleId === roleId)
                .permissions.map((permission) => permission.permissionId);

            setFormData((prevData) => ({
                ...prevData,
                roleBasedPermissions: {
                    ...prevData.roleBasedPermissions,
                    [roleId]: allPermissions,
                },
            }));
        } else {
            // Deselect all permissions for the role
            setFormData((prevData) => ({
                ...prevData,
                roleBasedPermissions: {
                    ...prevData.roleBasedPermissions,
                    [roleId]: [],
                },
            }));
        }
    };

    const handleImageChange = (e) => {
        handleChange(e);
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    return (
        <>
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
                            Users
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Edit</span>
                    </li>
                </ul>
            </div>
            <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
                {/* Simple */}
                <div className="panel" id="forms_grid">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Edit User
                        </h5>
                    </div>
                    <div className="mb-4">
                        <div className="">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="hidden"
                                    name="userid"
                                    id="userid"
                                    value={formData.userid}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="md:flex md:justify-between">
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                        <div className="rounded-full w-[120px] mx-auto outline-orange-300 outline p-1 relative">
                                            <label
                                                htmlFor="oFile"
                                                className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center outline outline-2 outline-while cursor-pointer"
                                            >
                                                <LuUploadCloud />
                                            </label>
                                            <input
                                                className="hidden"
                                                type="file"
                                                id="oFile"
                                                accept="image/png"
                                                name="avatar"
                                                onChange={handleImageChange}
                                            />
                                            <div className="w-[110px] h-[110px] overflow-hidden rounded-full flex items-center justify-center">
                                                <img
                                                    className="w-[110px] rounded-full"
                                                    src={image}
                                                    alt="Upload"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                        <div className="flex nowrap items-center">
                                            <div className="mb-4 mr-1 w-[50%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Username
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4 ml-1 w-[50%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Status
                                                </label>
                                                <select
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name="status"
                                                    id="status"
                                                    value={formData.status}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="1">
                                                        Active
                                                    </option>
                                                    <option value="0">
                                                        Inactive
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex nowrap items-center">
                                            <div className="mb-4 mr-1  w-[50%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    First Name
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4 ml-1  w-[50%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Last Name
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:flex md:justify-between">
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                        <div className="flex nowrap items-center">
                                            <div className="mb-4 mr-1 w-[50%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Gender
                                                </label>
                                                <select
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    name="gender"
                                                    id="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Male">
                                                        Male
                                                    </option>
                                                    <option value="Female">
                                                        Female
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="mb-4 ml-1 w-[50%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Date of Birth
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="date"
                                                    name="dateOfBirth"
                                                    id="dateOfBirth"
                                                    value={formData.dateOfBirth}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex nowrap items-center">
                                            <div className="mb-4 w-[100%]">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Password
                                                </label>
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Mobile
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="tel"
                                                name="mobile"
                                                id="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                Email
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h4 className="block text-gray-700 text-sm font-bold mb-1 mx-4 mt-4">
                                    Roles Based Permissions
                                </h4>
                                {/* Button */}
                                <div className="roles flex nowrap items-center pt-2 mx-4 border-b border-solid border-gray-300">
                                    <button
                                        type="button"
                                        className={`${
                                            activeBtn === "Common User"
                                                ? " btn-after  font-extrabold"
                                                : ""
                                        } btn bg-transparent border-0 relative`}
                                        onClick={() =>
                                            setActiveBtn("Common User")
                                        }
                                    >
                                        Common
                                    </button>
                                    <button
                                        type="button"
                                        className={`${
                                            activeBtn === "Department Head"
                                                ? " btn-after  font-extrabold"
                                                : ""
                                        } btn bg-transparent border-0 relative`}
                                        onClick={() =>
                                            setActiveBtn("Department Head")
                                        }
                                    >
                                        Department
                                    </button>
                                    <button
                                        type="button"
                                        className={`${
                                            activeBtn ===
                                            "Individual Permissions"
                                                ? " btn-after  font-extrabold"
                                                : ""
                                        } btn bg-transparent border-0 relative`}
                                        onClick={() =>
                                            setActiveBtn(
                                                "Individual Permissions"
                                            )
                                        }
                                    >
                                        Individual
                                    </button>
                                </div>

                                {/* OLD Start */}

                                {/* 
                            <div className="md:flex md:justify-between">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Username
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            First Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Email
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Status
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="status"
                                            id="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="md:w-1/2 px-3">
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Mobile
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="tel"
                                            name="mobile"
                                            id="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Gender
                                        </label>
                                        <select
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="gender"
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="date"
                                            name="dateOfBirth"
                                            id="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Avatar
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="avatar"
                                            id="avatar"
                                            value={formData.avatar}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Password
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div> */}

                                {/* OLD End */}
                                {/* Common Users & Department Head Permission */}
                                <div className="mb-4">
                                    {/* <h4 className="block text-gray-700 text-sm font-bold mb-2">
                                        Roles Based Permissions
                                    </h4> */}

                                    <div>
                                        {roles.map((data, index) => (
                                            <div
                                                key={data.id}
                                                className={`flex items-baseline mb-2 ${
                                                    index !== roles.length - 1
                                                        ? "border-b border-gray-300"
                                                        : ""
                                                } ${
                                                    data.role_name === activeBtn
                                                        ? ""
                                                        : "hidden"
                                                }`}
                                            >
                                                {/* Permission Header */}
                                                <div className="role-name w-3/12 ">
                                                    {" "}
                                                    {/* 30% width */}
                                                    {/* <label className="inline-flex mr-3">
                                                <input 
                                                    type="checkbox" 
                                                    className="form-checkbox mr-5" 
                                                    name="roles[]"
                                                    id={`role-${data.id}`}
                                                    checked={formData.selectedRoles.includes(data.id)}
                                                    onChange={(e) => handleRoleChange(data.id, e.target.checked)}
                                                />
                                                <span>{data.role_name}</span>
                                            </label>  */}
                                                    <label className="inline-flex mr-3">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox mr-5"
                                                            name={`selectedRoleBasedPermissions[${data.id}]`}
                                                            id={`role-${data.id}-permission-select-all`}
                                                            checked={
                                                                selectAllPermissions[
                                                                    data.id
                                                                ] || false
                                                            }
                                                            onChange={(e) =>
                                                                handleSelectAllPermissions(
                                                                    data.id,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                        <span>
                                                            {data.role_name}
                                                        </span>
                                                    </label>
                                                </div>

                                                {/* All Permissions */}
                                                <div className="permissions-list w-9/12">
                                                    {" "}
                                                    {/* 70% width */}
                                                    {rolewisepermissionArray
                                                        .filter(
                                                            (roleData) =>
                                                                roleData.roleId ===
                                                                data.id
                                                        ) // Filter to include only the Role ID from the current iteration
                                                        .map(
                                                            (
                                                                filteredData,
                                                                index
                                                            ) => (
                                                                <div
                                                                    className="permissionunderorles all-permission-lists"
                                                                    key={index}
                                                                >
                                                                    {/* <h3>
                                                        Role ID: 
                                                        {filteredData.roleId}
                                                    </h3>  */}
                                                                    {filteredData.permissions.map(
                                                                        (
                                                                            permission,
                                                                            permissionIndex
                                                                        ) => (
                                                                            <label
                                                                                key={
                                                                                    permissionIndex
                                                                                }
                                                                                className="inline-flex mr-3 mb-6"
                                                                            >
                                                                                <input
                                                                                    type="checkbox"
                                                                                    className="form-checkbox"
                                                                                    name={`selectedRoleBasedPermissions[${data.id}]`} // Use the role ID as the key in the form data
                                                                                    id={`role-${data.id}-permission-${permission.permissionId}`}
                                                                                    checked={formData.roleBasedPermissions[
                                                                                        data
                                                                                            .id
                                                                                    ]?.includes(
                                                                                        permission.permissionId
                                                                                    )}
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleRoleBasedPermissionChange(
                                                                                            data.id,
                                                                                            permission.permissionId,
                                                                                            e
                                                                                                .target
                                                                                                .checked
                                                                                        )
                                                                                    }
                                                                                />
                                                                                {/* <span>Permission ID: {permission.permissionId} Permission Name: {permission.permission_name}</span> */}
                                                                                <span>
                                                                                    {
                                                                                        permission.permission_name
                                                                                    }
                                                                                </span>
                                                                            </label>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Individual Permission */}
                                <div
                                    className={`${
                                        activeBtn === "Individual Permissions"
                                            ? ""
                                            : "hidden"
                                    } mb-4`}
                                >
                                    {/* <h4 className="block text-gray-700 text-sm font-bold mb-2">
                                        Individual Permissions
                                    </h4> */}
                                    <div className="all-permission-lists">
                                        {permissions.map((data) => (
                                            <>
                                                <label
                                                    key={data.id}
                                                    className="inline-flex mr-3 mb-6"
                                                >
                                                    <input
                                                        className="form-checkbox"
                                                        type="checkbox"
                                                        name="permissions[]"
                                                        id={`permission-${data.id}`}
                                                        checked={formData.selectedPermissions.includes(
                                                            data.id
                                                        )}
                                                        onChange={(e) =>
                                                            handlePermissionChange(
                                                                data.id,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <span>
                                                        {data.permission_name}
                                                    </span>
                                                </label>
                                                {data.permission_name ===
                                                    "super-admin" && <br />}
                                                {data.permission_name ===
                                                    "super-admin" && <br />}
                                            </>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Update User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// import { Link, usePage } from '@inertiajs/react';
Edituser.layout = (page) => <MainLayout children={page} />;

export default Edituser;
