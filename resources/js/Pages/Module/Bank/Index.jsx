import React, { useEffect, useState,Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import MainLayout from "../../Layout/Mainlayout";
import { DataTable } from "mantine-datatable";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";

function Index() {
    const { base_url, flash , result, permissions } = usePage().props;


    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(result, "name");
    const [recordsData2, setRecordsData2] = useState(initialRecords2);
    const [search2, setSearch2] = useState("");


    const [modal3, setModal3] = useState(false);
    const [isDeleteId, setDeleteID] = useState();


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
            return result.filter((item) => {
                return (
                    (item.branch_name && item.branch_name.toLowerCase().includes(search2.toLowerCase())) ||
                    (item.name && item.name.toLowerCase().includes(search2.toLowerCase()))
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
    // function editGroupCompany(result) {
    //     router.get("/admin/bank/edit/" + result.id);
    // }

    function deleteFunction(result) {
        setModal3(true)
        setDeleteID(result?.id)
        // router.get("/admin/bank/status/" + result.id);
    }
    function cancelDeleteFunction() {
        setModal3(false)
    }
    function confirmDeleteFunction(result) {
        setModal3(false)
        router.get("/admin/bank/delete/" + result.id);
    }
    return (
        <>
        {
            result ?
            <>
            <FlashMessage flash={flash} />
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
                            Bank
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>

            {
                permissions.includes('bank-view') || permissions.includes('super-admin') ? (
                    <div className="panel mt-6">
                        <div className="flex md:items-center flex-col sm:flex-row justify-between mb-5 gap-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Bank
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
                                {
                                    permissions.includes('bank-create') || permissions.includes('super-admin') ? (
                                        <Link
                                            href={`${base_url}/admin/bank/create`}
                                            method="get"
                                            className="px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px]"
                                        >
                                            Add
                                        </Link>
                                    ) : null
                                }
                            </div>
                        </div>
                        <div className="datatables">
                            <DataTable
                                className="whitespace-nowrap table-hover"
                                records={recordsData2}
                                columns={[
                                    {
                                        accessor: "name",
                                        title: "Name",
                                        render: ({ name }) => (
                                            <div className="flex items-center w-max">
                                                <div>{name}</div>
                                            </div>
                                        ),
                                    },
                                    { accessor: "branch_code", title: "Branch Code" },
                                    { accessor: "branch_name", title: "Branch Name" },
                                    {
                                        accessor: "action",
                                        title: "Action",
                                        titleClassName: "!text-center",
                                        render: (result) => (
                                            <div className="flex items-center w-max mx-auto gap-2">
                                                {
                                                    permissions.includes('bank-edit') || permissions.includes('super-admin') ? (
                                                        <Link
                                                            href={`${base_url}/admin/bank/edit/`+result.id}
                                                            method="get"
                                                            className="btn btn-sm btn-outline-primary"
                                                            >
                                                            Edit
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    permissions.includes('bank-delete') || permissions.includes('super-admin') ? (
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            deleteFunction(result)
                                                        }
                                                        >Delete
                                                    </button>
                                                    ) : null
                                                }
                                                {/*    <Link*/}
                                                {/*    href={`${base_url}/admin/bank/delete/`+result.id}*/}
                                                {/*    */}
                                                {/*>*/}
                                                {/*    Delete*/}
                                                {/*</Link>*/}
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
                ) : null
            }
            </> :
            <h1>Loadig ...</h1>
        }
            {
                isDeleteId && (
                    <div className="mb-5">
                        <Transition appear show={modal3} as={Fragment}>
                            <Dialog as="div" open={modal3} onClose={() => setModal3(true)}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0" />
                                </Transition.Child>
                                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                    <div className="flex items-start justify-center min-h-screen px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                                <div className="p-5">
                                                    <div className="text-center">

                                                        <span className="block h-[90px] w-[90px] mx-auto rounded-full border border-solid border-red-700 leading-[90px] text-center text-[50px] text-danger">!</span>

                                                        <h1 className="mt-5"> Are you sure?</h1>
                                                        <p>
                                                            You won't be able to revert this!
                                                        </p>
                                                    </div>


                                                    <div className="flex justify-center items-center mt-8 gap-2">
                                                        <button type="button" onClick={() =>
                                                            cancelDeleteFunction()
                                                        } className="btn btn-outline-success">
                                                            Cancel
                                                        </button>

                                                        <Link
                                                            href={`${base_url}/admin/bank/delete/`+isDeleteId}
                                                            method="get"
                                                            className="btn btn-outline-danger"
                                                        >
                                                            Yes, delete it!
                                                        </Link>

                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                )
            }

        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || Bank" />
);
export default Index;
