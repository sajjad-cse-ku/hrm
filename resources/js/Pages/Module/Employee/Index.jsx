import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { DataTable } from "mantine-datatable";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";

function Index({  }) {
    const { base_url, flash, result, permissions } = usePage().props;
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(result, "first_name");
    const [recordsData2, setRecordsData2] = useState(initialRecords2);

    const [search2, setSearch2] = useState("");
    const [sortStatus2, setSortStatus2] = useState({
        columnAccessor: "first_name",
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
                const fullName = `${item.first_name || ''} ${item.last_name || ''}`.toLowerCase();
                const search = search2.toLowerCase();
                const joiningDate = item?.professionaldata?.joining_date;
                const mobile = item?.mobile;
                const designation = item?.professionaldata?.designation?.name?.toLowerCase();
                const department = item?.professionaldata?.department?.name?.toLowerCase();

                return (
                    fullName.includes(search) ||  // Check for name match
                    (joiningDate && joiningDate.includes(search)) || // Check for joining date match
                    (mobile && mobile.includes(search)) || // Check for mobile match
                    (designation && designation.includes(search)) || // Check for designation match
                    (department && department.includes(search))  // Check for department match
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
    function statusChanged(result) {
        router.get("/admin/employee/status/" + result.id);
    }
    // function deleteData(result) {
    //     router.get("/admin/employee/delete/" + result.id);
    // }
    return (
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
                            Employee
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>List</span>
                    </li>
                </ul>
            </div>

            {
                permissions.includes('employee-view') || permissions.includes('super-admin') ? (
                    <div className="panel mt-6">
                        <div className="flex md:items-center flex-col sm:flex-row justify-between mb-5 gap-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Employee
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
                                    permissions.includes('super-admin') ? (
                                        <a
                                            href={`${base_url}/admin/employee/export-all-employee`}
                                            method="get"
                                            className="px-7 py-2 bg-green-600 text-white rounded-md text-[15px]"
                                        >
                                            Export
                                        </a>
                                    ) : null
                                }
                                {
                                    permissions.includes('employee-create') || permissions.includes('super-admin') ? (
                                        <Link
                                            href={`${base_url}/admin/employee/create`}
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
                                        accessor: "full_name",
                                        title: "Name",
                                        render: ({ first_name ,last_name , avatar }) => (

                                            <div className="flex items-center w-max">
                                                <img
                                                    className="w-9 h-9 rounded-full ltr:mr-2 rtl:ml-2 object-cover"
                                                    src={avatar ? `/storage/profile/${avatar}` : '/assets/images/user-profile.jpeg'}
                                                    alt=""
                                                />
                                                <div>{first_name} {last_name}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: "emp_id", // You can choose any name for the accessor
                                        title: "Emp ID",
                                        render: ({ machine_user_id, professionaldata }) => {
                                            const joining_date = professionaldata?.joining_date;
                                            const carbonDate = new Date(joining_date);
                                            const formattedDate = carbonDate?.toLocaleDateString('en-US', { year: '2-digit', month: 'numeric' });

                                            return (
                                            <div className="flex items-center w-max">
                                                <span dangerouslySetInnerHTML={{ __html: `LL-${formattedDate} - ${machine_user_id} <br/> <span class="text-indigo-800 font-bold text-[16px]">${professionaldata?.working?.name}</span>` }} />
                                            </div>
                                            );
                                        },
                                    },
                                    {
                                        accessor: "Designation",
                                        title: (
                                            <span dangerouslySetInnerHTML={{ __html: 'Designation <br/> Department' }} />
                                        ),
                                        render: ({ professionaldata }) => (
                                            <div className="flex items-center w-max">
                                                <span dangerouslySetInnerHTML={{ __html: `${professionaldata?.designation?.name} <br/> ${professionaldata?.department?.name}` }} />
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: "joining_date",
                                        title:"Joining Date",
                                        render: ({ professionaldata }) => (
                                            <div className="flex items-center w-max">
                                                <span dangerouslySetInnerHTML={{ __html: `${professionaldata?.joining_date}` }} />
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: "mobile",
                                        title: "Mobile",
                                    },
                                    {
                                        accessor: "blood_group",
                                        title:"Blood Group",
                                        render: ({ personaldata }) => (
                                            <div className="flex items-center w-max">
                                                <span dangerouslySetInnerHTML={{ __html: `${personaldata?.blood_group}` }} />
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: "address",
                                        title:"Address",
                                        render: ({ personaldata }) => (
                                            <div className="flex items-center w-max">
                                                <div>
                                                    <p>{personaldata?.pr_address}</p>
                                                    <p>{personaldata?.pr_police_station}</p>
                                                    <p>{personaldata?.pr_district} - {personaldata?.pr_post_code}</p>
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: "status",
                                        title:"Status",
                                        titleClassName: "text-center",
                                        render: (result) => (
                                            <label className="w-12 h-6 relative"
                                                   onClick={() =>
                                                       statusChanged(result)
                                                   }
                                            >
                                                <input defaultChecked={result.status === 1} type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1"  />
                                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                        ),
                                    },
                                    {
                                        accessor: "action",
                                        title: "Action",
                                        titleClassName: "!text-center",
                                        render: (result) => (
                                            <div className="flex items-center w-max mx-auto gap-2">
                                                {
                                                    permissions.includes('employee-edit') || permissions.includes('super-admin') ? (
                                                        <Link
                                                            href={`${base_url}/admin/employee/edit/`+result.id}
                                                            method="get"
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            Edit
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    permissions.includes('employee-delete') || permissions.includes('super-admin') ? (
                                                        <Link
                                                            href={`${base_url}/admin/employee/delete/`+result.id}
                                                            method="get"
                                                            className="btn btn-sm btn-outline-danger"
                                                        >
                                                            Delete
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    permissions.includes('emp-education-view') || permissions.includes('super-admin') ? (
                                                        <Link
                                                            href={`${base_url}/admin/employee_education/`+result.id}
                                                            method="get"
                                                            className="btn btn-sm btn-outline-success"
                                                        >
                                                            Education
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    permissions.includes('emp-posting-view') || permissions.includes('super-admin') ? (
                                                        <Link
                                                            href={`${base_url}/admin/employee_posting/`+result.id}
                                                            method="get"
                                                            className="btn btn-sm btn-outline-warning"
                                                        >
                                                            Posting
                                                        </Link>
                                                    ) : null
                                                }
                                                {
                                                    permissions.includes('emp-promotion-view') || permissions.includes('super-admin') ? (
                                                        <Link
                                                            href={`${base_url}/admin/emp_promotion/`+result.id}
                                                            method="get"
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            Promotion
                                                        </Link>
                                                    ) : null
                                                }

                                                <Link
                                                    href={`${base_url}/admin/assign-roster/create/`+result.id}
                                                    method="get"
                                                    className="btn btn-sm btn-outline-info"
                                                >
                                                    Roster
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
                ) : null
            }
        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || Employee" />
);
export default Index;
