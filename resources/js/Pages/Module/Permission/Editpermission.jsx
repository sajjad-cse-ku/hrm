import { Link, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'; // Import useEffect 
import MainLayout from '../../Layout/Mainlayout';

function Editpermission() {
    const { permission, permissions, modules } = usePage().props;

    // Initialize formData with existing data when the component is mounted
    useEffect(() => {
        setFormData({
            permissionID: permission.id,
            permission_name: permission.permission_name,
            module_id: permission.module_id,
        });
    }, [permission]);

    const [formData, setFormData] = useState({
        permissionID: '',
        permission_name: '', // Add a state field for permission name
        module_id: '',
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
        console.log(formData);
        router.post('/admin/permissions/update', formData);
    };

    return (
        <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">
            {/* Simple */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Edit Permission</h5>
                </div>
                <div className="createuser-form">
                    <div className="w-full mx-auto">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="hidden"
                                name="permissionID"
                                id="permissionID"
                                value={formData.permissionID}
                                onChange={handleChange}
                                required
                            />
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="module_id"
                                id="module_id"
                                value={formData.module_id} // Bind to formData.module_id
                                onChange={handleChange}
                            >
                                <option value="">Select Module</option>
                                {modules.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Permission Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    name="permission_name"
                                    id="permission_name"
                                    value={formData.permission_name}
                                    onChange={handleChange}
                                    required
                                />
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
Editpermission.layout = (page) => <MainLayout children={page} />;

export default Editpermission;
