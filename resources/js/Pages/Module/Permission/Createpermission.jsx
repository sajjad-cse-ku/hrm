import { Link, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import MainLayout from '../../Layout/Mainlayout';

function CreatePermission() {
  const { modules } = usePage().props;
  const [formData, setFormData] = useState({
    permission_name: '', // Add a state field for permission name
    module_id: '', // Add a state field for module_id
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

    // Adjust the endpoint to match your Laravel API route for creating permissions
    router.post('/admin/permissions/store', formData);
  };

  return (
    <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">
      <div className="panel">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Create Permission</h5>
        </div>
        <div className="createuser-form">
          <div className="w-full mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Module</label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="module_id"
                  id="module_id"
                  value={formData.module_id}
                  onChange={handleChange}
                >
                  <option value="">Select Module</option>
                  {modules.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Permission Name</label>
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
                  Create Permission
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

CreatePermission.layout = (page) => <MainLayout children={page} />;

export default CreatePermission;
