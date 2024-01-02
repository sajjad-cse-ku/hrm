import { Link, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { HiX } from "react-icons/hi";

function Createuser() {
    const [activeBtn, setActiveBtn] = useState("Common User");
    const [image, setImage] = useState(null);
    const { roles, permissions, currentuser, rolewisepermission } =
        usePage().props;
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

    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        status: 1,
        mobile: "",
        gender: "Male",
        dateOfBirth: "",
        avatar: "",
        password: "",
        selectedPermissions: [],
        roleBasedPermissions: {},
        // selectedRoles: [],
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

    const handleChange = (e) => {
        const { name } = e.target;
        const value = name === "avatar" ? e.target.files[0] : e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData);
        router.post("/admin/users/store", formData);
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

    const handleChangeImage = (e) => {
        handleChange(e);
        let file = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    return (
        <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">
            {/* Simple */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Create User
                    </h5>
                </div>
                <div className="createuser-form">
                    <div className="w-full mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded  pt-6 pb-8 mb-4"
                        >
                            <div>
                                <div className="mb-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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

                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                        <div className="mb-4 mx-4">
                                            <label className="block text-gray-700 text-sm font-bold">
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
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <label className="block text-gray-700 text-sm font-bold mx-4">
                                            Upload Image from Your Device
                                        </label>
                                        <div className="mb-4 mx-4 upload-box">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
                                                type="file" // Use "file" instead of "files"
                                                name="avatar"
                                                id="avatar"
                                                multiple // Add the "multiple" attribute to allow multiple file selections
                                                onChange={handleChangeImage}
                                            />
                                            {!image && (
                                                <label
                                                    htmlFor="avatar"
                                                    className="btn btn-primary cursor-pointer"
                                                >
                                                    Upload
                                                </label>
                                            )}
                                            {image && (
                                                <div className="img-box">
                                                    <img
                                                        src={image}
                                                        alt="Upload Image"
                                                    />
                                                    <div
                                                        className="close-btn"
                                                        onClick={() => {
                                                            setImage(null);
                                                            setFormData({
                                                                ...formData,
                                                                avatar: "",
                                                            });
                                                            document.getElementById(
                                                                "avatar"
                                                            ).value = "";
                                                        }}
                                                    >
                                                        <HiX />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* All Permission Start */}

                            <h4 className="block text-gray-700 text-sm font-bold mb-2 mx-4">
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
                                    onClick={() => setActiveBtn("Common User")}
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
                                        activeBtn === "Individual Permissions"
                                            ? " btn-after  font-extrabold"
                                            : ""
                                    } btn bg-transparent border-0 relative`}
                                    onClick={() =>
                                        setActiveBtn("Individual Permissions")
                                    }
                                >
                                    Individual
                                </button>
                            </div>

                            {/* Common Users & Department Head Permission */}
                            <div className="mb-4 mx-4">
                                {/* <h4 className="block text-gray-700 text-sm font-bold mb-2">
                                    Roles Based Permissions
                                </h4> */}

                                <div className="mt-5">
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
                                            <div className="role-name w-3/12">
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
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <span>
                                                        {data.role_name}
                                                    </span>
                                                </label>
                                            </div>
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
                                } mb-4 mx-4`}
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

                            {/* Submit button */}
                            <div className="flex items-center justify-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// import { Link, usePage } from '@inertiajs/react';
Createuser.layout = (page) => <MainLayout children={page} />;

export default Createuser;
