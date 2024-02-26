import { Link, usePage } from '@inertiajs/react';
import React, {useEffect, useState} from 'react'
import Tippy from '@tippyjs/react';
import { themeConfig } from '../../Store/ThemeConfig';
import MainLayout from '../../Layout/Mainlayout';
import { useTranslation } from 'react-i18next';
import FlashMessage from '../../Component/FlashMessage';
import {DataTable} from "mantine-datatable";
function Userlist() {

    const { users, permissions, flash,base_url } = usePage().props
    const { t } = useTranslation();

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(users, "name");
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
            return users.filter((item) => {
                return (
                    (item.first_name && item.first_name.toLowerCase().includes(search2.toLowerCase())) ||
                    (item.email && item.email.toLowerCase().includes(search2.toLowerCase()))
                );
            });
        });
    }, [search2]);


    const formatDate = (date) => {
        if (date) {
            const dt = new Date(date);
            const month =
                dt.getMonth() + 1 < 10
                    ? "0" + (dt.getMonth() + 1)
                    : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
            return day + "/" + month + "/" + dt.getFullYear();
        }
        return "";
    };

  return (
    <>
        <FlashMessage flash={flash}/>

        <div className="panel mt-6">
            <div className="flex md:items-center flex-col sm:flex-row justify-between mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">
                    Modules
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
                        href={`${base_url}/admin/modules/create`}
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
                            accessor: "first_name",
                            title: "Name",
                            render: ({ first_name,last_name }) => (
                                <div className="flex items-center w-max">
                                    <div>{first_name} {last_name}</div>
                                </div>
                            ),
                        },
                        {
                            accessor: "email",
                            title: "Name",
                            render: ({ email }) => (
                                <div className="flex items-center w-max">
                                    <div>{email}</div>
                                </div>
                            ),
                        },
                        {
                            accessor: "action",
                            title: "Action",
                            titleClassName: "!text-center",
                            render: (users) => (
                                <div className="flex items-center w-max mx-auto gap-2">
                                    <Link
                                        href={`${base_url}/admin/users/${users.id}/edit`}
                                        method="get"
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/admin/users/${users.id}/delete`}
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
Userlist.layout = page => <MainLayout children={page} />

export default Userlist