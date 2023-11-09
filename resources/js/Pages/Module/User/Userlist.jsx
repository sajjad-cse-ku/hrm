import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react' 
import Tippy from '@tippyjs/react'; 
import { themeConfig } from '../../Store/ThemeConfig';
import MainLayout from '../../Layout/Mainlayout';
import { useTranslation } from 'react-i18next'; 
import FlashMessage from '../../Component/FlashMessage';
function Userlist() {

    const { users, permissions, flash } = usePage().props
    const { t } = useTranslation();

    // console.log(permissions);


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
                    <h5 className="font-semibold text-lg dark:text-white-light">Users List</h5> 
                    {
                        permissions.includes('user-create') || permissions.includes('super-admin')  ? (
                            <Link
                                href={`/admin/users/create`}
                                method="get"
                                className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px]"
                            >
                                {t('Create User')}
                            </Link>
                        ) : null
                    }
                    
                </div>
                <div className="table-responsive mb-5">

                    {
                        permissions.includes('user-view') || permissions.includes('super-admin')  ? ( 
                                                
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th> 
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        {users.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>
                                        <div className="whitespace-nowrap">{data.first_name} {data.last_name}</div>
                                    </td>
                                    <td>{data.email}</td> 
                                    
                                    <td className="text-center action-btns">
                                    <td className="text-center action-btns">
                                          
 
                                            {/* <Link
                                                href={`/admin/users/${data.id}/edit`}
                                                method="get"
                                                className={`px-7 py-2 bg-blue-600 text-white rounded-md text-[15px] mr-3 ${
                                                permissions.includes('user_edit') ? '' : 'hidden'
                                            }`}
                                            >
                                                Edit
                                            </Link> */}
                                            
                                            <div className="flex items-center w-max mx-auto gap-2">
                                                {
                                                    permissions.includes('user-edit') || permissions.includes('super-admin')  ? (
                                                        <Link href={`/admin/users/${data.id}/edit`} method="get" className="btn btn-sm btn-outline-primary">
                                                            Edit
                                                        </Link>
                                                    ) : null
                                                }

                                                {
                                                    permissions.includes('user-delete') || permissions.includes('super-admin')  ? (
                                                        <Link href={`/admin/users/${data.id}/delete`} method="get" className="btn btn-sm btn-outline-danger">
                                                            Delete
                                                        </Link>
                                                    ) : null
                                                }
                                            </div>
                                            
                                           
   
                                      </td>
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
Userlist.layout = page => <MainLayout children={page} />
 
export default Userlist