import { Link, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import MainLayout from '../../Layout/Mainlayout';

function Createrole() {
    const { allPermissions } = usePage().props

    const [formData, setFormData] = useState({
        role_name: '', // Add a state field for permission name
        selectedPermissions: [],

    });
    const handlePermissionChange = (permissionID, checked) => {
        if (checked) {
          setFormData((prevData) => ({
            ...prevData,
            selectedPermissions: [...prevData.selectedPermissions, permissionID],
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

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        router.post('/admin/roles/store', formData)
      };


  return (

    <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">




            {/* Simple */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Create Role</h5>
                </div>
                <div className="createuser-form">
                    <div className="w-full mx-auto">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

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
                                <div>
                                {/* <div className='all-permission-lists'>
                                {permissions.map((data) => (
                                    <label key={data.id} className="inline-flex mr-3" data-moduleid={data.module_id}>
                                        <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        name="permissions[]"
                                        id={`permission-${data.id}`}
                                        checked={formData.selectedPermissions.includes(data.id)}
                                        onChange={(e) => handlePermissionChange(data.id, e.target.checked)}
                                        />
                                        <span>{data.permission_name}</span>
                                    </label>
                                ))}
                                </div> */}
                                {/* <div className='all-permission-lists'>
                                    {permissions
                                      .sort((a, b) => a.module_id - b.module_id) // Sort the permissions array based on module_id
                                      .map((data) => (
                                        <label key={data.id} className="inline-flex mr-3" data-moduleid={data.module_id}>
                                          <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            name="permissions[]"
                                            id={`permission-${data.id}`}
                                            checked={formData.selectedPermissions.includes(data.id)}
                                            onChange={(e) => handlePermissionChange(data.id, e.target.checked)}
                                          />
                                          <span>{data.permission_name}</span>
                                        </label>
                                      ))}
                                  </div>  */}

<div className="all-permission-lists">
  {allPermissions
    .sort((a, b) => a.module_id - b.module_id)
    .map((data, index, array) => (
      <React.Fragment key={data.id}>
        {index === 0 || data.module_id !== array[index - 1].module_id ? (
          <div className="module-title" id={`moduleid-${data.module_id}`}>
            <h4>{data?.module?.name}</h4>
          </div>
        ) : null}
        <label className="inline-flex mr-3" data-moduleid={data.module_id}>
          <input
            type="checkbox"
            className="form-checkbox"
            name="permissions[]"
            id={`permission-${data.id}`}
            checked={formData.selectedPermissions.includes(data.id)}
            onChange={(e) => handlePermissionChange(data.id, e.target.checked)}
          />
          <span>{data.permission_name}</span>
        </label>
      </React.Fragment>
    ))}
</div>






                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Create Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
  )
}

// import { Link, usePage } from '@inertiajs/react';
Createrole.layout = page => <MainLayout children={page} />

export default Createrole