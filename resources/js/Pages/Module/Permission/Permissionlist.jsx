import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import { useTranslation } from "react-i18next";
import { themeConfig } from "../../Store/ThemeConfig";
import MainLayout from "../../Layout/Mainlayout";
import FlashMessage from "../../Component/FlashMessage";

function Permissionlist() {
    const { permissions, flash, permissionscheck } = usePage().props;
    const { t } = useTranslation();

    // console.log(permissionscheck);

    // const userlistData = [
    //     {
    //         // id: 1,
    //         // name: 'John Doe',
    //         // email: 'johndoe@yahoo.com',
    //         // date: '10/08/2020',
    //     },

    // ];

    const isRtl = themeConfig.rtlClass === "rtl" ? true : false;

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
            <FlashMessage flash={flash} />

            <div className="grid xl:grid-cols-1 gap-6 grid-cols-1">
                {/* Simple */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5 flex-wrap">
                        <h5 className="font-semibold text-lg dark:text-white-light  whitespace-nowrap mb-2">
                            Permission List
                        </h5>

                        {permissionscheck.includes("permission-create") ||
                            (permissionscheck.includes("super-admin") && (
                                <Link
                                    href={`/admin/permissions/create`}
                                    method="get"
                                    className=" whitespace-nowrap px-7 py-2 bg-indigo-600 text-white rounded-md text-[15px] mb-2"
                                >
                                    {t("Create Permission")}
                                </Link>
                            ))}
                    </div>
                    <div className="table-responsive mb-5">
                        {permissionscheck.includes("permission-view") ||
                        permissionscheck.includes("super-admin") ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Permission ID</th>
                                        <th>Module Name</th>
                                        <th>Permission Name</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissions.map((data) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>
                                                    {data.module?.name || "N/A"}
                                                </td>
                                                <td>{data.permission_name}</td>
                                                <td className="text-center action-btns">
                                                    <div className="flex items-center w-max mx-auto gap-2">
                                                        {permissionscheck.includes(
                                                            "permission-edit"
                                                        ) ||
                                                            (permissionscheck.includes(
                                                                "super-admin"
                                                            ) && (
                                                                <Link
                                                                    href={`/admin/permissions/${data.id}/edit`}
                                                                    method="get"
                                                                    className="btn btn-sm btn-outline-primary"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            ))}

                                                        {permissionscheck.includes(
                                                            "permission-delete"
                                                        ) ||
                                                            (permissionscheck.includes(
                                                                "super-admin"
                                                            ) && (
                                                                <Link
                                                                    href={`/admin/permissions/${data.id}/delete`}
                                                                    method="get"
                                                                    className="btn btn-sm btn-outline-danger"
                                                                >
                                                                    Delete
                                                                </Link>
                                                            ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <h3>
                                You are not authorized to see this page conent
                            </h3>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

// import { Link, usePage } from '@inertiajs/react';
Permissionlist.layout = (page) => <MainLayout children={page} />;

export default Permissionlist;
