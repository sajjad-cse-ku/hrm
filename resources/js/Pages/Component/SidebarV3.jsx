import React, { useEffect, useState } from "react";
import { themeConfig } from "../Store/ThemeConfig";
import { Link, usePage } from "@inertiajs/react";
import AnimateHeight from "react-animate-height";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import "react-perfect-scrollbar/dist/css/styles.css";
import {
    TbClockCancel,
    TbReplace,
    TbSmartHome,
    TbSettingsCog,
    TbHome,
} from "react-icons/tb";
import { LuMailWarning, LuClipboardCheck } from "react-icons/lu";
import { PiBuildingsLight } from "react-icons/pi";
import {
    FaFingerprint,
    FaRegChartBar,
    FaUserGear,
    FaUsersGear,
} from "react-icons/fa6";
import { ImTree } from "react-icons/im";
import { GiSandsOfTime } from "react-icons/gi";
import { BsUiChecks } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdTouchApp } from "react-icons/md";

const SidebarV3 = ({ handleToggleSidebar, isToggleSidebar }) => {
    const { url, base_url, auth } = usePage().props;

    // const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [currentMenuItem, setCurrentMenuItem] = useState("");
    const [currentMenu, setCurrentMenu] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const [isClickSideArrow, setIsClickSideArrow] = useState(false);
    const semidark = themeConfig.semidark;
    const { t } = useTranslation();
    const toggleMenu = (value) => {
        // setCurrentMenuItem((oldValue) => {
        //     return oldValue === value ? "" : value;
        // });
        setCurrentMenuItem(value);
    };
    useEffect(() => {
        let menuItems = sessionStorage.getItem("item");
        const menu = sessionStorage.getItem("menu");

        if (menu) {
            handleChangeCurrentMenu(menu);
        }

        if (menuItems) {
            handleChangeCurrentMenuItem(menuItems);
        } else {
            handleChangeCurrentMenuItem("Dashboard");
        }
        const selector = document.querySelector(
            '.sidebar ul a[href="' + window.location.pathname + '"]'
        );
        if (selector) {
            selector.classList.add("active");
            const ul = selector.closest("ul.sub-menu");
            if (ul) {
                let ele =
                    ul.closest("li.menu").querySelectorAll(".nav-link") || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            setToggleSidebar(!toggleSidebar);
        }
    }, []);

    const handleChangeCurrentMenuItem = (item) => {
        toggleMenu(item);
        sessionStorage.setItem("item", item);
    };
    const handleChangeCurrentMenu = (item) => {
        if (item === currentMenu && isMenuOpen) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
        // toggleMenu(item);
        setCurrentMenu(item);
        sessionStorage.setItem("menu", item);
    };

    const handleChangeNavigationToggle = () => {
        handleToggleSidebar();
        setIsClickSideArrow(!isClickSideArrow);
    };

    return (
        <div className={semidark ? "dark" : ""}>
            <nav
                // shadow-[5px_0_25px_0_rgba(94,92,154,0.1)]
                className={`sidebarV3 fixed min-h-screen h-full top-0 bottom-0  z-50 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
                    semidark ? "text-white-dark" : ""
                }`}
            >
                <div className="bg-white dark:bg-black relative menu-hov">
                    {/* Side navigation bar header */}
                    {/* <BrandHeader
                        handleClick={() => handleToggleSidebar()}
                        t={t}
                    /> */}

                    {/* side navigation bar side arrow button */}
                    {
                        // window.innerWidth > 1023 &&
                        <SideArrowBar
                            // handleClick={handleToggleSidebar}
                            isToggleSidebar={isToggleSidebar}
                            semidark={semidark}
                            onClickBtn={handleToggleSidebar}
                        />
                    }
                    {/* all main menu items */}

                    <PerfectScrollbar className="relative verticlescroll scrollwidth-0">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <div className="mt-2 mb-2"></div>

                            {menuItems.map((data) => {
                                const { Icon } = data;
                                return (
                                    <li key={data.id} className="menu nav-item">
                                        {data.items.length > 0 ? (
                                            // which menu have submenu
                                            <button
                                                type="button"
                                                className={`${
                                                    currentMenu === data.title
                                                        ? "active-menu"
                                                        : ""
                                                } nav-link group w-full`}
                                                onClick={() => {
                                                    handleChangeCurrentMenu(
                                                        data.title
                                                    );
                                                    if (
                                                        window.innerWidth > 1024
                                                    ) {
                                                        handleToggleSidebar(
                                                            false
                                                        );
                                                    }
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <span>
                                                        <Icon />
                                                    </span>

                                                    {
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark menu-title">
                                                            {t(data.title)}
                                                        </span>
                                                    }
                                                </div>

                                                <Arrow
                                                    isCurrentMenu={
                                                        currentMenu ===
                                                        data.title
                                                    }
                                                />
                                            </button>
                                        ) : (
                                            // which menu haven't any submenu
                                            <Link
                                                href={`${base_url}/${data.to}`}
                                                className={`${
                                                    currentMenuItem ===
                                                    data.title
                                                        ? "active"
                                                        : ""
                                                } group`}
                                                media="get"
                                                onClick={() => {
                                                    handleChangeCurrentMenuItem(
                                                        data.title
                                                    );
                                                    setCurrentMenu(data.title);
                                                    handleToggleSidebar(false);
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <span>
                                                        <Icon />
                                                    </span>

                                                    {
                                                        <span
                                                            // className="ltr:pl-3 rtl:pr-3 text-inherit dark:text-[#506690] dark:group-hover:text-white-dark menu-title"
                                                            className="ltr:pl-3 rtl:pr-3 menu-title"
                                                        >
                                                            {t(data.title)}
                                                        </span>
                                                    }
                                                </div>
                                            </Link>
                                        )}

                                        {((data.items.length > 0 &&
                                            !isToggleSidebar) ||
                                            window.innerWidth < 1025) && (
                                            // Submenu
                                            <AnimateHeight
                                                duration={300}
                                                height={
                                                    currentMenu ===
                                                        data.title && isMenuOpen
                                                        ? "auto"
                                                        : 0
                                                }
                                            >
                                                <ul className="sub-menu text-gray-500 mb-1">
                                                    {data.items.map((item) => {
                                                        return (
                                                            <li key={item.id}>
                                                                <Link
                                                                    className={
                                                                        currentMenuItem ===
                                                                        item.title
                                                                            ? "active"
                                                                            : ""
                                                                    }
                                                                    onClick={() => {
                                                                        handleChangeCurrentMenuItem(
                                                                            item.title
                                                                        );
                                                                        if (
                                                                            window.innerWidth <
                                                                            1025
                                                                        ) {
                                                                            handleToggleSidebar();
                                                                        }
                                                                    }}
                                                                    href={
                                                                        item.userId ===
                                                                        true
                                                                            ? `${base_url}/${
                                                                                  item.to +
                                                                                  auth.id
                                                                              }`
                                                                            : `${base_url}/${item.to}`
                                                                    }
                                                                >
                                                                    {t(
                                                                        item.title
                                                                    )}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </AnimateHeight>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );

    function SideArrowBar({ isToggleSidebar, semidark, onClickBtn }) {
        return (
            <div
                className={` side-btn bg-white dark:bg-black`}
                onClick={() => {
                    onClickBtn();
                    // setIsToggleSidebar(!isToggleSidebar);
                }}
                style={isToggleSidebar ? { display: "flex" } : {}}
            >
                {!isToggleSidebar ? (
                    window.innerWidth > 1024 ? (
                        <ArrowLeft semidark={semidark} />
                    ) : (
                        <ArrowRight semidark={semidark} />
                    )
                ) : window.innerWidth > 1024 ? (
                    <ArrowRight semidark={semidark} />
                ) : (
                    <ArrowLeft semidark={semidark} />
                )}
            </div>
        );
    }
};

export default SidebarV3;

const ArrowLeft = ({ semidark }) => {
    return (
        <span
            className={semidark ? "dark" : ""}
            style={semidark ? { color: "#fff" } : {}}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 m-auto"
            >
                <path
                    d="M13 19L7 12L13 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    opacity="0.5"
                    d="M16.9998 19L10.9998 12L16.9998 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
};

const ArrowRight = ({ semidark }) => {
    return (
        <span className="rotate-180" style={semidark ? { color: "#fff" } : {}}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 m-auto"
            >
                <path
                    d="M13 19L7 12L13 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    opacity="0.5"
                    d="M16.9998 19L10.9998 12L16.9998 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
};

const Arrow = ({ isCurrentMenu }) => {
    return (
        <div
            className={
                isCurrentMenu
                    ? "!rotate-90 icon-box block"
                    : "rtl:rotate-180 icon-box"
            }
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9 5L15 12L9 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

function BrandHeader({ t, handleClick }) {
    return (
        <div className="flex justify-between items-center px-4 py-3">
            {/* <Link href="/" className="main-logo flex items-center shrink-0">
                <img
                    className="w-8 ml-[5px] flex-none"
                    src="/assets/images/logo.svg"
                    alt="logo"
                />
                <span className="text-xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                    {t("HR PAYROLL")}
                </span>
            </Link> */}
            <button
                type="button"
                className="11collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                onClick={handleClick}
            >
                <ArrowLeft />
            </button>
        </div>
    );
}

const menuItems = [
    {
        id: 1,
        title: "Dashboard",
        to: "admin/dashboard",
        Icon: TbHome,
        items: [],
    },
    {
        id: 2,
        title: "Notice",
        to: "admin/notice",
        Icon: LuMailWarning,
        items: [],
    },
    {
        id: 3,
        title: "Task Management",
        to: "",
        Icon: LuClipboardCheck,
        items: [
            {
                id: 300,
                title: "Project",
                to: "admin/project",
            },
            {
                id: 301,
                title: "Assign Task",
                to: "admin/task/assign-task",
            },
            {
                id: 302,
                title: "My Task",
                to: "admin/task/my-task",
            },
        ],
    },
    {
        id: 4,
        title: "Manage Company",
        to: "",
        Icon: PiBuildingsLight,
        items: [
            {
                id: 400,
                title: "Group Companies",
                to: "admin/group-companies",
            },
            {
                id: 401,
                title: "Company",
                to: "admin/companies",
            },
        ],
    },
    {
        id: 5,
        title: "Configuration",
        to: "",
        Icon: TbSettingsCog,
        items: [
            {
                id: 500,
                title: "Religions",
                to: "admin/religions",
            },
            {
                id: 501,
                title: "Title",
                to: "admin/title",
            },
            {
                id: 502,
                title: "Bank",
                to: "admin/bank",
            },
            {
                id: 503,
                title: "Working Status",
                to: "admin/working_status",
            },
            {
                id: 504,
                title: "Org Calender",
                to: "admin/org_calender",
            },
            {
                id: 505,
                title: "Site Settings",
                to: "admin/site-settings",
            },
        ],
    },
    {
        id: 6,
        title: "Manage Department",
        to: "",
        Icon: ImTree,
        items: [
            {
                id: 600,
                title: "Designation",
                to: "admin/designation",
            },
            {
                id: 601,
                title: "Department",
                to: "admin/department",
            },
            {
                id: 602,
                title: "Sub Department (Section)",
                to: "admin/section",
            },
        ],
    },
    {
        id: 7,
        title: "Manage Employee",
        to: "",
        Icon: FaUserGear,
        items: [
            {
                id: 700,
                title: "Manage Employee",
                to: "admin/employee",
            },
        ],
    },
    {
        id: 8,
        title: "Leave Management",
        to: "",
        Icon: GiSandsOfTime,
        items: [
            {
                id: 800,
                title: "Leave Category",
                to: "admin/leave_category",
            },
            {
                id: 801,
                title: "Leave Application",
                to: "admin/leave_application",
            },
            {
                id: 802,
                title: "Leave Acknowledge",
                to: "admin/leave_application/leave-acknowledge",
            },
            {
                id: 803,
                title: "Leave Recommend",
                to: "admin/leave_application/leave-report-to",
            },
            {
                id: 804,
                title: "Leave Approval",
                to: "admin/leave_application/requested-user",
            },
            {
                id: 805,
                title: "Public Holiday",
                to: "admin/public_holiday",
            },

            {
                id: 807,
                title: "Leave approved by HR",
                to: "admin/leave_application/direct-leave-approve",
            },
        ],
    },
    {
        id: 9,
        title: "Shift Management",
        to: "",
        Icon: TbReplace,
        items: [
            {
                id: 901,
                title: "Manage Shift",
                to: "admin/shift",
            },
            {
                id: 902,
                title: "Duty Locations",
                to: "admin/duty_locations",
            },
        ],
    },
    {
        id: 10,
        title: "Attendance Management",
        to: "",
        Icon: BsUiChecks,
        items: [
            {
                id: 1000,
                title: "My Att. Report",
                to: "admin/my-attendance-report/",
                userId: true,
            },
            {
                id: 1001,
                title: "Attendance Report",
                to: "admin/all-or-department-wise/attendance-report",
            },
            {
                id: 1002,
                title: "Manual Attendance",
                to: "admin/manual-attendance",
            },
            {
                id: 1003,
                title: "Manual Comment",
                to: "admin/manual-comment",
            },
        ],
    },
    {
        id: 11,
        title: "Late Management",
        to: "",
        Icon: TbClockCancel,
        items: [
            {
                id: 1100,
                title: "Apply List",
                to: "admin/apply-list",
            },
            {
                id: 1101,
                title: "Late Apply",
                to: "admin/late-apply",
            },
            {
                id: 1102,
                title: "Late list",
                to: "admin/late-list",
            },
            {
                id: 1103,
                title: "Custom Late Allow",
                to: "admin/custom-late-allow",
            },
        ],
    },
    {
        id: 12,
        title: "Roster Management",
        to: "",
        Icon: FaUsersGear,
        items: [
            {
                id: 1200,
                title: "Roster Entry",
                to: "admin/roster",
            },
            {
                id: 1201,
                title: "Approved Update",
                to: "admin/roster/update",
            },
            {
                id: 1202,
                title: "Approved Roster",
                to: "admin/roster/approved",
            },
        ],
    },
    {
        id: 13,
        title: "Users",
        to: "",
        Icon: HiOutlineUserCircle,
        items: [
            {
                id: 1300,
                title: "Profile",
                to: "admin/users/profile",
            },
            {
                id: 1301,
                title: "Account Settings",
                to: "admin/users/user-account-settings",
            },
            {
                id: 1302,
                title: "All Users",
                to: "admin/users",
            },
            {
                id: 1303,
                title: "Roles",
                to: "admin/roles",
            },
            {
                id: 1304,
                title: "Permissions",
                to: "admin/permissions",
            },
            {
                id: 1305,
                title: "Modules",
                to: "admin/modules",
            },
        ],
    },
    {
        id: 14,
        title: "Report Management",
        to: "",
        Icon: FaRegChartBar,
        items: [
            {
                id: 1400,
                title: "Emp. Attendance",
                to: "admin/employee-attendance/date-range-wise",
            },
            {
                id: 1401,
                title: "Dept. Attendance",
                to: "admin/department-attendance/date-range-wise",
            },
            {
                id: 1402,
                title: "All Emp. Attendance",
                to: "admin/all-emp-attendance/date-range-wise",
            },
            {
                id: 1403,
                title: "Punch Details Attendance",
                to: "admin/punch-details/date-range-wise",
            },
            {
                id: 1404,
                title: "Late Flag Report",
                to: "admin/late-flag-report",
            },
            {
                id: 1405,
                title: "Employee Report",
                to: "admin/all-type-employee",
            },
            {
                id: 1406,
                title: "Emp.Leave Report",
                to: "admin/emp-leave",
            },
            {
                id: 1407,
                title: "Dept.Leave Report",
                to: "admin/all-or-dept-leave",
            },
            {
                id: 1408,
                title: "M&Y Epm.Leave Report",
                to: "admin/employee-leave-details-month-year",
            },
        ],
    },
    {
        id: 15,
        title: "Get Punch Details",
        to: "admin/get-punch-details",
        Icon: MdTouchApp,
        items: [],
    },
    {
        id: 16,
        title: "Get Attendance",
        to: "admin/get-date-wise-attendance",
        Icon: FaFingerprint,
        items: [],
    },
];
