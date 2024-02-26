import { Link, usePage } from '@inertiajs/react';
import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import MainLayout from "../../Layout/Mainlayout";
import FlashMessage from '../../Component/FlashMessage';
import {DataTable} from "mantine-datatable";


function Permissionlist() {

    const { allPermissions, flash, base_url } = usePage().props

    const { t } = useTranslation();

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(allPermissions, "name");
    const [recordsData2, setRecordsData2] = useState(initialRecords2);

    const [search2, setSearch2] = useState("");
    const [sortStatus2, setSortStatus2] = useState({
        columnAccessor: "name",
        direction: "asc",
    });

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize2;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

    useEffect(() => {
        setInitialRecords2(() => {
            return allPermissions.filter((item) => {
                return (
                    (item.permission_name && item.permission_name.toLowerCase().includes(search2.toLowerCase()))
                );
            });
        });
    }, [search2]);
  return (

       <>
       <FlashMessage flash={flash}/>
           <div className="panel mt-6">
               <div className="flex md:items-center flex-col sm:flex-row justify-between mb-5 gap-5">
                   <h5 className="font-semibold text-lg dark:text-white-light">
                       Permissions
                   </h5>
                   <div className="flex md:items-center gap-5">
                       <div>
                           <input
                               type="text"
                               className="form-input md:w-auto"
                               placeholder="Search..."
                               value={search2}
                               onChange={(e) => setSearch2(e.target.value)}
                           />
                       </div>
                       <Link
                           href={`/admin/permissions/create`}
                           method="get"
                           className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px]"
                       >
                           Add
                       </Link>
                   </div>
               </div>
               <div className="datatables">
                   <DataTable
                       className="whitespace-nowrap table-hover"
                       records={recordsData2}
                       columns={[
                           {
                               accessor: "permission_name",
                               title: "Name",
                               render: ({ permission_name}) => (
                                   <div className="flex items-center w-max">
                                       <div>{permission_name}</div>
                                   </div>
                               ),
                           },
                           {
                               accessor: "module",
                               title: "Module",
                               render: ({ module}) => (
                                   <div className="flex items-center w-max">
                                       <div>{module?.name}</div>
                                   </div>
                               ),
                           },
                           {
                               accessor: "action",
                               title: "Action",
                               titleClassName: "!text-center",
                               render: (allPermissions) => (
                                   <div className="flex items-center w-max mx-auto gap-2">
                                       <Link
                                           href={`/admin/permissions/${allPermissions.id}/edit`}
                                           method="get"
                                           className="btn btn-sm btn-outline-primary"
                                       >
                                           Edit
                                       </Link>
                                       <Link
                                           href={`/admin/permissions/${allPermissions.id}/delete`}
                                           method="get"
                                           className="btn btn-sm btn-outline-danger"
                                       >
                                           Delete
                                       </Link>
                                   </div>
                               ),
                           },
                       ]}
                       totalRecords={initialRecords2.length}
                       recordsPerPage={pageSize2}
                       page={page2}
                       onPageChange={(p) => setPage2(p)}
                       recordsPerPageOptions={PAGE_SIZES}
                       onRecordsPerPageChange={setPageSize2}
                       onSortStatusChange={setSortStatus2}
                       minHeight={200}
                       paginationText={({ from, to, totalRecords }) =>
                           `Showing  ${from} to ${to} of ${totalRecords} entries`
                       }
                   />
               </div>
           </div>
       </>
  )
}

// import { Link, usePage } from '@inertiajs/react';
Permissionlist.layout = page => <MainLayout children={page} />

export default Permissionlist