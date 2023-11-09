import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import { themeConfig } from '../../Store/ThemeConfig';
import FlashMessage from '../../Component/FlashMessage';
import MainLayout from '../../Layout/Mainlayout';

function Rolelist() {

    const { roles, flash, permissions } = usePage().props
    const { t } = useTranslation();

    console.log(roles.Permissions);


    const isRtl = themeConfig.rtlClass === 'rtl' ? true : false;

     const [tabs, setTabs] = useState([]);
    const toggleCode = (name) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

  return (


    <>
    <FlashMessage flash={flash}/>
        <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">
            {/* Simple */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Roles List</h5>
                        {permissions.includes('role-create') || permissions.includes('super-admin') &&
                             <Link
                             href={`/admin/roles/create`}
                             method="get"
                             className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px]"
                         >
                         {t('Create')}
                         </Link>
                        }
                </div>
                <div className="table-responsive mb-5">
                {
                        permissions.includes('role-view') || permissions.includes('super-admin')  ? (

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Permissions</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        {roles.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>
                                        <div className="whitespace-nowrap">{data.role_name}</div>
                                    </td>
                                    {/* <td>{data.permission_names.join(', ')}</td>   */}
                                    <td>
                                        {data.Permissions.map((permission, index) => (
                                            <span className='singlePermission' key={index} style={{ border: '1px solid #cdcdcd', padding: '2px 5px', margin: '2px', backgroundColor: '#f8f8f8', borderRadius: '4px', display: 'inline-block' }}>
                                                {permission.permission_name}
                                                <span style={{ display: 'none' }}>{permission.id}</span>
                                            </span>
                                        ))}
                                    </td>
                                    <td className="text-center action-btns">
                                        <div className="flex items-center w-max mx-auto gap-2">
                                            {permissions.includes('role-edit') || permissions.includes('super-admin') &&
                                                <Link
                                                    href={`/admin/roles/${data.id}/edit`}
                                                    method="get"
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Edit
                                                </Link>
                                            }

                                            {permissions.includes('role-delete') || permissions.includes('super-admin') &&
                                                <Link
                                                    href={`/admin/roles/${data.id}/delete`}
                                                    method="get"
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Delete
                                                </Link>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        </tbody>
                    </table>
                     ) : (
                        <h3>You are not authorized to see this page conent</h3>
                    )
                }
                </div>

            </div>
        </div>
    </>
  )
}

// import { Link, usePage } from '@inertiajs/react';
Rolelist.layout = page => <MainLayout children={page} />

export default Rolelist