import { Link, router, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react"; // Import useEffect
import MainLayout from "../../Layout/Mainlayout";

function Editrole() {
    const { role, permissions, currentpermission } = usePage().props;

    // Initialize formData with existing data when the component is mounted
    useEffect(() => {
        setFormData({
            id: role.id,
            role_name: role.role_name,
            selectedPermissions: currentpermission,
        });
    }, [role]);

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

    const [formData, setFormData] = useState({
        id: "",
        role_name: "", // Add a state field for role name
        selectedPermissions: [],
    });

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
        router.post("/admin/roles/update", formData);
    };

    return (
        <div className="pt-5 grid lg:grid-cols-1 grid-cols-1 gap-6">
            {/* Simple */}
            <div className="panel" id="forms_grid">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Edit Role
                    </h5>
                </div>
                <div className="mb-4">
                    <div className="mx-4">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="hidden"
                                name="id"
                                id="id"
                                value={formData.id}
                                onChange={handleChange}
                                required
                            />
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Role Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    name="role_name"
                                    id="role_name"
                                    value={formData.role_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <h4 className="block text-gray-700 text-sm font-bold mb-2">
                                    Permissions
                                </h4>
                                {/* <label className="inline-flex">
                                    <input type="checkbox" className="form-checkbox" defaultChecked />
                                    <span>Primary</span>
                                </label> */}
                                <div className="all-permission-lists">
                                    {permissions.map((data) => (
                                        <label
                                            key={data.id}
                                            className="inline-flex mr-3 mb-6"
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
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
                                            <span>{data.permission_name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Update
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
Editrole.layout = (page) => <MainLayout children={page} />;

export default Editrole;
