import React, { useEffect, useState } from "react";
import { themeConfig } from "../Store/ThemeConfig";
import { Link, usePage } from "@inertiajs/react";
import AnimateHeight from "react-animate-height";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";

function Sidebar({ handleToggleSidebar }) {
    const { url, base_url, auth } = usePage().props;

    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [currentMenu, setCurrentMenu] = useState("");
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const semidark = themeConfig.semidark;
    const { t } = useTranslation();
    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? "" : value;
        });
    };
    useEffect(() => {
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

    return (
        <div className={semidark ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
                    semidark ? "text-white-dark" : ""
                }`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <Link
                            href="/"
                            className="main-logo flex items-center shrink-0"
                        >
                            <img
                                className="w-8 ml-[5px] flex-none"
                                src="/assets/images/logo.svg"
                                alt="logo"
                            />
                            <span className="text-xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                                {t("HR PAYROLL")}
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="11collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={handleToggleSidebar}
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
                        </button>
                    </div>

                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative verticlescroll scrollwidth-0">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <div className="mt-2 mb-2"></div>
                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link
                                            href={`${base_url}/admin/dashboard`}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M7.5013 1.66699H3.33464C2.41416 1.66699 1.66797 2.41318 1.66797 3.33366V9.16699C1.66797 10.0875 2.41416 10.8337 3.33464 10.8337H7.5013C8.42178 10.8337 9.16797 10.0875 9.16797 9.16699V3.33366C9.16797 2.41318 8.42178 1.66699 7.5013 1.66699Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M16.6654 1.66699H12.4987C11.5782 1.66699 10.832 2.41318 10.832 3.33366V5.83366C10.832 6.75413 11.5782 7.50033 12.4987 7.50033H16.6654C17.5858 7.50033 18.332 6.75413 18.332 5.83366V3.33366C18.332 2.41318 17.5858 1.66699 16.6654 1.66699Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M7.5013 12.5H3.33464C2.41416 12.5 1.66797 13.2462 1.66797 14.1667V16.6667C1.66797 17.5871 2.41416 18.3333 3.33464 18.3333H7.5013C8.42178 18.3333 9.16797 17.5871 9.16797 16.6667V14.1667C9.16797 13.2462 8.42178 12.5 7.5013 12.5Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M16.6654 9.16699H12.4987C11.5782 9.16699 10.832 9.91318 10.832 10.8337V16.667C10.832 17.5875 11.5782 18.3337 12.4987 18.3337H16.6654C17.5858 18.3337 18.332 17.5875 18.332 16.667V10.8337C18.332 9.91318 17.5858 9.16699 16.6654 9.16699Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Dashboard")}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            className={
                                                url ===
                                                `${base_url}/admin/notice`
                                                    ? "active"
                                                    : ""
                                            }
                                            href={`${base_url}/admin/notice`}
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_2016)">
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M11 5.24512V11.9118C11 12.4375 10.552 12.8642 10 12.8642C9.448 12.8642 9 12.4375 9 11.9118V5.24512C9 4.71941 9.448 4.29274 10 4.29274C10.552 4.29274 11 4.71941 11 5.24512ZM11 14.7689C11 15.2946 10.552 15.7213 10 15.7213C9.448 15.7213 9 15.2946 9 14.7689C9 14.2432 9.448 13.8166 10 13.8166C10.552 13.8166 11 14.2432 11 14.7689ZM18 16.667C18 17.1928 17.552 17.6194 17 17.6194H3C2.448 17.6194 2 17.1928 2 16.667V3.33371C2 2.80799 2.448 2.38132 3 2.38132H17C17.552 2.38132 18 2.80799 18 3.33371V16.667ZM18 0.476562H2C0.894999 0.476562 0 1.33274 0 2.38417V2.38798V17.6261C0 18.6785 0.894999 19.5242 2 19.5242H18C19.105 19.5242 20 18.6746 20 17.6223V2.38798C20 1.3356 19 0.476562 18 0.476562Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_2016">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Notice")}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "task_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("task_management")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16.875 9.99966C16.7093 9.99966 16.5503 10.0655 16.4331 10.1827C16.3159 10.2999 16.25 10.4589 16.25 10.6247V12.4997C16.25 12.6654 16.3159 12.8244 16.4331 12.9416C16.5503 13.0588 16.7093 13.1247 16.875 13.1247C17.0408 13.1247 17.1997 13.0588 17.317 12.9416C17.4342 12.8244 17.5 12.6654 17.5 12.4997V10.6247C17.5 10.4589 17.4342 10.2999 17.317 10.1827C17.1997 10.0655 17.0408 9.99966 16.875 9.99966ZM17.225 7.60591C17.1902 7.58213 17.1524 7.5632 17.1125 7.54966C17.0752 7.53084 17.0351 7.51818 16.9938 7.51217C16.8934 7.49206 16.7895 7.49693 16.6915 7.52636C16.5934 7.55578 16.504 7.60886 16.4313 7.68091C16.3733 7.73931 16.3275 7.80858 16.2964 7.88472C16.2653 7.96087 16.2495 8.04241 16.25 8.12466C16.25 8.29043 16.3159 8.4494 16.4331 8.56661C16.5503 8.68382 16.7093 8.74966 16.875 8.74966C17.0408 8.74966 17.1997 8.68382 17.317 8.56661C17.4342 8.4494 17.5 8.29043 17.5 8.12466C17.4977 7.95919 17.433 7.80069 17.3188 7.68091L17.225 7.60591Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M15.625 2.5H15C15 2.00272 14.8025 1.52581 14.4508 1.17417C14.0992 0.822544 13.6223 0.625 13.125 0.625H6.875C6.37772 0.625 5.90081 0.822544 5.54917 1.17417C5.19754 1.52581 5 2.00272 5 2.5H4.375C3.88626 2.49983 3.41677 2.69049 3.06654 3.03138C2.71632 3.37227 2.51303 3.83644 2.5 4.325V17.55C2.51303 18.0386 2.71632 18.5027 3.06654 18.8436C3.41677 19.1845 3.88626 19.3752 4.375 19.375H15.625C16.1137 19.3752 16.5832 19.1845 16.9335 18.8436C17.2837 18.5027 17.487 18.0386 17.5 17.55V14.375C17.5 14.2092 17.4342 14.0503 17.3169 13.9331C17.1997 13.8158 17.0408 13.75 16.875 13.75C16.7092 13.75 16.5503 13.8158 16.4331 13.9331C16.3158 14.0503 16.25 14.2092 16.25 14.375V17.55C16.2374 17.7069 16.166 17.8534 16.0502 17.96C15.9343 18.0666 15.7825 18.1255 15.625 18.125H4.375C4.21755 18.1255 4.06571 18.0666 3.94984 17.96C3.83396 17.8534 3.7626 17.7069 3.75 17.55V4.325C3.7626 4.16805 3.83396 4.02164 3.94984 3.91504C4.06571 3.80844 4.21755 3.7495 4.375 3.75H5C5 4.24728 5.19754 4.72419 5.54917 5.07583C5.90081 5.42746 6.37772 5.625 6.875 5.625H13.125C13.6223 5.625 14.0992 5.42746 14.4508 5.07583C14.8025 4.72419 15 4.24728 15 3.75H15.625C15.7825 3.7495 15.9343 3.80844 16.0502 3.91504C16.166 4.02164 16.2374 4.16805 16.25 4.325V5.625C16.25 5.79076 16.3158 5.94973 16.4331 6.06694C16.5503 6.18415 16.7092 6.25 16.875 6.25C17.0408 6.25 17.1997 6.18415 17.3169 6.06694C17.4342 5.94973 17.5 5.79076 17.5 5.625V4.325C17.487 3.83644 17.2837 3.37227 16.9335 3.03138C16.5832 2.69049 16.1137 2.49983 15.625 2.5ZM13.75 3.75C13.75 3.91576 13.6842 4.07473 13.5669 4.19194C13.4497 4.30915 13.2908 4.375 13.125 4.375H6.875C6.70924 4.375 6.55027 4.30915 6.43306 4.19194C6.31585 4.07473 6.25 3.91576 6.25 3.75V2.5C6.25 2.33424 6.31585 2.17527 6.43306 2.05806C6.55027 1.94085 6.70924 1.875 6.875 1.875H13.125C13.2908 1.875 13.4497 1.94085 13.5669 2.05806C13.6842 2.17527 13.75 2.33424 13.75 2.5V3.75Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M13.9143 8.3315L8.75185 14.094L6.0706 11.4315C5.95103 11.3291 5.79724 11.2756 5.63994 11.2817C5.48264 11.2878 5.33343 11.353 5.22212 11.4643C5.11081 11.5756 5.0456 11.7248 5.03953 11.8821C5.03345 12.0394 5.08696 12.1932 5.18935 12.3127L8.31435 15.4377C8.42974 15.5555 8.58699 15.6229 8.75185 15.6252C8.83695 15.6233 8.92076 15.604 8.99814 15.5686C9.07552 15.5331 9.14484 15.4822 9.20185 15.419L14.8268 9.169C14.9379 9.04551 14.9954 8.88296 14.9866 8.7171C14.9778 8.55125 14.9035 8.39568 14.78 8.28462C14.6565 8.17357 14.4939 8.11611 14.3281 8.1249C14.1622 8.13369 14.0067 8.20801 13.8956 8.3315H13.9143Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Task Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "task_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "task_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/project`}
                                                    >
                                                        {t("Project")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/task/assign-task`}
                                                    >
                                                        {t("Assign Task")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/task/my-task`}
                                                    >
                                                        {t("My Task")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu === "manage_company"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("manage_company")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16 13H14V15H16M16 9H14V11H16M18 17H10V15H12V13H10V11H12V9H10V7H18M8 5H6V3H8M8 9H6V7H8M8 13H6V11H8M8 17H6V15H8M4 5H2V3H4M4 9H2V7H4M4 13H2V11H4M4 17H2V15H4M10 5V1H0V19H20V5H10Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Manage Company")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "manage_company"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu === "manage_company"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/group-companies`}
                                                        method="get"
                                                    >
                                                        {t("Group Companies")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/companies`}
                                                    >
                                                        {t("Company")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu === "configuration"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("configuration")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_2003)">
                                                        <path
                                                            d="M12.5635 8.36416L12.1951 7.49043C12.1951 7.49043 13.05 5.56148 12.9757 5.48726L11.8436 4.38144C11.7647 4.30519 9.83436 5.185 9.83436 5.185L8.94376 4.82538C8.94376 4.82538 8.15504 2.87012 8.04844 2.87012H6.44941C6.33876 2.87012 5.61144 4.83078 5.61144 4.83078L4.72152 5.19174C4.72152 5.19174 2.75006 4.35377 2.67449 4.42596L1.54303 5.53449C1.46476 5.61208 2.36548 7.5019 2.36548 7.5019L1.99845 8.37563C1.99845 8.37563 0 9.14411 0 9.24936V10.816C0 10.924 2.00317 11.6371 2.00317 11.6371L2.37088 12.5081C2.37088 12.5081 1.51537 14.4384 1.59026 14.5127L2.72307 15.6198C2.79931 15.6947 4.73096 14.8136 4.73096 14.8136L5.62224 15.1759C5.62224 15.1759 6.40893 17.1298 6.51688 17.1298H8.11591C8.22589 17.1298 8.95523 15.1691 8.95523 15.1691L9.84583 14.8082C9.84583 14.8082 11.8146 15.6462 11.8908 15.574L13.023 14.4654C13.1006 14.3905 12.1992 12.4994 12.1992 12.4994L12.5676 11.6256C12.5676 11.6256 14.5667 10.8545 14.5667 10.7492V9.18392C14.5674 9.07664 12.5635 8.36416 12.5635 8.36416ZM7.28334 12.2841C5.99804 12.2841 4.94957 11.2586 4.94957 9.99895C4.94957 8.74064 5.99804 7.71511 7.28334 7.71511C8.57066 7.71511 9.61711 8.74064 9.61711 9.99895C9.61711 11.2593 8.57066 12.2841 7.28334 12.2841Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M19.2539 6.53944L19.2634 6.08334C19.2634 6.08334 20.0177 5.4046 19.9995 5.35737L19.7202 4.65029C19.6992 4.60171 18.6784 4.60846 18.6784 4.60846L18.3586 4.27651C18.3586 4.27651 18.3978 3.26311 18.3499 3.2422L17.6475 2.92712C17.5976 2.90485 16.8939 3.62543 16.8939 3.62543L16.4324 3.60721C16.4324 3.60721 15.7314 2.85222 15.6841 2.87044L14.9683 3.1356C14.9204 3.15246 14.944 4.15978 14.944 4.15978L14.61 4.47217C14.61 4.47217 13.5825 4.41684 13.5615 4.46272L13.2532 5.15091C13.2316 5.19949 13.9718 5.9059 13.9718 5.9059L13.9623 6.35929C13.9623 6.35929 13.2087 7.03939 13.2269 7.08661L13.5069 7.79437C13.5271 7.8416 14.5479 7.83418 14.5479 7.83418L14.8671 8.16748C14.8671 8.16748 14.83 9.18087 14.8779 9.20178L15.5802 9.51552C15.6288 9.53778 16.3332 8.82126 16.3332 8.82126L16.7954 8.83677C16.7954 8.83677 17.495 9.59176 17.5436 9.57489L18.2574 9.30974C18.3067 9.29287 18.2831 8.2842 18.2831 8.2842L18.6164 7.97451C18.6164 7.97451 19.6439 8.02714 19.6655 7.98126L19.9738 7.29307C19.9934 7.24584 19.2539 6.53944 19.2539 6.53944ZM17.6394 6.6791C17.3918 7.23235 16.7306 7.47794 16.1638 7.22493C15.5998 6.97326 15.3407 6.31679 15.5883 5.76219C15.8346 5.21029 16.4978 4.96605 17.0619 5.21771C17.6266 5.47207 17.8857 6.1272 17.6394 6.6791Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_2003">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Configuration")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "configuration"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu === "configuration"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/religions`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/religions`}
                                                        method="get"
                                                    >
                                                        {t("Religions")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/title`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/title`}
                                                    >
                                                        {t("Title")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/bank`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/bank`}
                                                    >
                                                        {t("Bank")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/working_status`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/working_status`}
                                                    >
                                                        {t("Working Status")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/org_calender`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/org_calender`}
                                                    >
                                                        {t("Org Calender")}
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/site-settings`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/site-settings`}
                                                    >
                                                        {t("Site Settings")}
                                                    </Link>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <Link href={`${base_url}/admin/bangladesh`}>{t('Bangladesh')}</Link>*/}
                                                {/*</li>*/}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu === "departments"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("departments")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M18.2805 13.3934H16.4703V10.3034C16.47 10.115 16.3974 9.93444 16.2685 9.80147C16.1398 9.66854 15.9652 9.59409 15.7834 9.59443H10.2022V6.55043H11.8672C11.9971 6.55043 12.1216 6.49689 12.2134 6.4018C12.3053 6.3067 12.3568 6.17757 12.3568 6.04308V1.78131C12.3562 1.5017 12.1371 1.27539 11.8672 1.27539H7.75376C7.48377 1.27607 7.26529 1.5031 7.26529 1.78271V6.04436C7.26609 6.32413 7.48508 6.55043 7.755 6.55043H9.41873V9.59583H3.83748C3.45987 9.59655 3.1539 9.91356 3.15324 10.3048V13.4085H1.7994C1.53244 13.4094 1.31641 13.638 1.31641 13.9198V18.2127C1.31641 18.495 1.53336 18.724 1.8007 18.724H5.86898C6.13602 18.7232 6.35205 18.4945 6.35205 18.2127V13.9185C6.35129 13.6366 6.13468 13.4085 5.86776 13.4085H3.93667V10.4062H9.41873V13.4502H7.755C7.62519 13.4502 7.50055 13.5037 7.40876 13.5989C7.31696 13.694 7.26529 13.823 7.26529 13.9576V18.218C7.26529 18.3525 7.31698 18.4815 7.40876 18.5767C7.50055 18.6718 7.62519 18.7253 7.755 18.7253H11.8672C11.9971 18.7253 12.1216 18.6718 12.2134 18.5767C12.3053 18.4815 12.3568 18.3525 12.3568 18.218V13.9562C12.3562 13.6766 12.1371 13.4502 11.8672 13.4502V13.4488H10.2022V10.4048H15.6868V13.3934H14.2009C13.877 13.3934 13.715 13.563 13.715 13.9049V18.2125C13.715 18.5544 13.8757 18.7253 14.1996 18.7253H18.2805C18.6044 18.7253 18.7663 18.5544 18.7663 18.2125V13.9062C18.7663 13.5644 18.6044 13.3934 18.2805 13.3934Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Manage Department")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "departments"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu === "departments"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/designation`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/designation`}
                                                    >
                                                        {t("Designation")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/department`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/department`}
                                                    >
                                                        {t("Department")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/section`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/section`}
                                                    >
                                                        {t(
                                                            "Sub Department (Section)"
                                                        )}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "manage_employee"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("manage_employee")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_1972)">
                                                        <path
                                                            d="M18.6321 14.4719C18.6068 14.1494 18.4668 13.8466 18.2376 13.6183C17.9339 13.5092 17.4476 13.9355 16.9521 13.6183C16.3648 13.191 16.7494 12.5565 16.5576 12.1292C16.4444 11.9797 16.2945 11.862 16.1226 11.7873C15.9506 11.7126 15.7623 11.6835 15.5758 11.7028C15.1812 12.2392 15.2821 12.5565 14.4921 12.5565C13.7021 12.4474 13.8948 11.7028 13.3103 11.7028C13.1509 11.6859 12.9901 11.7177 12.849 11.7939C12.708 11.8702 12.5934 11.9874 12.5203 12.1301C12.595 12.5667 12.5274 13.0157 12.3276 13.411C11.8312 13.8265 11.5376 13.411 11.0421 13.6192C10.8842 13.7187 10.7613 13.8651 10.6906 14.0378C10.6198 14.2106 10.6048 14.4011 10.6476 14.5828C10.7485 15.0101 11.4376 15.1192 11.4376 15.7537C11.4376 16.6083 10.7494 16.6083 10.6476 16.9255C10.595 17.1125 10.5946 17.3102 10.6464 17.4974C10.6981 17.6845 10.8001 17.854 10.9412 17.9874C11.1439 18.1955 11.7312 17.7683 12.2267 18.1955C12.3617 18.3567 12.4438 18.5556 12.4619 18.7651C12.48 18.9746 12.4331 19.1845 12.3276 19.3664C12.4307 19.5632 12.5868 19.7271 12.7784 19.8396C12.9699 19.9521 13.1892 20.0086 13.4112 20.0028C13.8058 20.0028 13.8058 19.1492 14.593 19.1492C15.1903 19.1492 15.1903 19.5765 15.4839 19.8937C15.6758 20.1128 16.2739 19.7846 16.5676 19.5765C16.7594 19.3683 16.3748 18.9401 16.5676 18.4055C16.6822 18.2132 16.8565 18.0635 17.0639 17.9792C17.3889 17.9244 17.7208 17.9244 18.0458 17.9792C18.1807 17.8386 18.2853 17.6718 18.3532 17.4892C18.4211 17.3066 18.4507 17.1119 18.4403 16.9174C18.3394 16.5892 17.7521 16.6983 17.6503 15.9537C17.5485 14.9865 18.4394 15.0955 18.6321 14.4719ZM14.8858 17.7665C12.6176 18.1819 11.723 14.4546 14.0958 13.8183C16.8603 13.2792 17.1639 17.2301 14.8858 17.7674V17.7665ZM10.0567 10.0828C9.47568 10.0639 8.90424 9.92982 8.37549 9.68831C7.84674 9.4468 7.37123 9.10269 6.97653 8.67594C6.58183 8.24919 6.27582 7.74831 6.07625 7.20235C5.87667 6.65639 5.78751 6.07623 5.81394 5.49554C5.78764 4.91493 5.87689 4.33487 6.07652 3.78902C6.27615 3.24316 6.58218 2.74238 6.97687 2.31573C7.37155 1.88908 7.84703 1.54505 8.37571 1.3036C8.9044 1.06215 9.47576 0.928082 10.0567 0.90918C10.6376 0.928082 11.2089 1.06215 11.7376 1.3036C12.2663 1.54505 12.7418 1.88908 13.1365 2.31573C13.5312 2.74238 13.8372 3.24316 14.0368 3.78902C14.2364 4.33487 14.3257 4.91493 14.2994 5.49554C14.3355 6.66392 13.9109 7.79968 13.1172 8.65784C12.3235 9.516 11.2243 10.0278 10.0567 10.0828ZM13.5112 11.1446C13.5112 11.1446 11.9312 11.1446 12.033 12.3155C12.1339 13.5965 10.5548 12.6328 10.2612 13.7055C9.86667 14.9865 10.453 14.7674 10.7576 15.621C10.9503 16.1574 9.96758 16.4746 10.0694 17.4392C10.2621 18.7201 11.2512 18.0755 11.5476 18.8292C11.7403 19.4655 11.0512 19.891 9.47212 19.891C8.18667 19.891 5.72576 19.891 4.83576 19.7819C4.83576 19.7819 2.27394 19.6728 2.27394 17.8665C2.25495 16.2176 2.77388 14.6075 3.75212 13.2801C4.29091 12.5816 4.97637 12.0098 5.76017 11.605C6.54397 11.2002 7.40703 10.9723 8.28849 10.9374L13.5112 11.1446Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_1972">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Manage Employee")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "manage_employee"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "manage_employee"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/employee`}
                                                        method="get"
                                                    >
                                                        {t("Manage Employee")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "leave_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("leave_management")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M7.21928 17.5233C3.9735 16.5797 1.709 13.4597 1.709 9.94977C1.709 5.60948 5.09316 2.08693 9.25732 2.08693C11.2702 2.08693 13.1699 2.90466 14.5915 4.37659C14.8431 4.6282 15.2457 4.64078 15.4973 4.38917C15.7489 4.13756 15.7615 3.73498 15.5099 3.48337C14.7047 2.64047 13.7612 1.98628 12.7044 1.5208C11.6225 1.05532 10.4525 0.803711 9.25732 0.803711C8.06217 0.803711 6.90476 1.05532 5.81026 1.53338C4.75349 1.99886 3.80995 2.65305 3.00479 3.49595C2.19964 4.33884 1.55803 5.32013 1.11771 6.40205C0.664812 7.52172 0.425781 8.71687 0.425781 9.94977C0.425781 10.9688 0.589328 11.9752 0.903842 12.9314C1.21836 13.8623 1.65867 14.7304 2.23738 15.5104C2.81609 16.2904 3.49543 16.9571 4.27543 17.5107C5.068 18.0768 5.93606 18.492 6.85444 18.7561C6.91734 18.7687 6.98025 18.7813 7.03057 18.7813C7.30734 18.7813 7.55895 18.6052 7.64702 18.3158C7.76024 17.9762 7.55895 17.6239 7.21928 17.5233Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M9.97543 5.83594C9.97543 5.48369 9.68607 5.19434 9.33382 5.19434C8.98156 5.19434 8.69221 5.48369 8.69221 5.83594V9.3585C8.69221 9.47172 8.64189 9.58495 8.57899 9.66043L6.32707 11.9878C6.07546 12.2394 6.08804 12.642 6.33965 12.8936C6.46545 13.0194 6.61642 13.0698 6.77997 13.0698C6.94351 13.0698 7.11964 13.0069 7.24545 12.8685L9.49737 10.5411C9.7993 10.2266 9.97543 9.79882 9.97543 9.34592V5.83594ZM21.386 15.7872C20.6941 15.0701 19.8889 14.5165 19.0083 14.1643C20.1531 13.3214 20.9079 11.9375 20.9079 10.3775C20.9079 7.81109 18.8825 5.7353 16.4041 5.7353C13.9257 5.7353 11.9002 7.82367 11.9002 10.3901C11.9002 11.9501 12.6551 13.3339 13.7999 14.1768C12.9822 14.5165 12.2148 15.0197 11.5606 15.6739C10.2522 16.9697 9.4722 18.4417 9.37156 20.3036V20.3665C9.3464 20.9829 9.57285 21.5868 10.0006 22.0271C10.4157 22.4674 11.1077 22.7065 11.699 22.7065H21.4992C22.5811 22.7065 23.4618 21.8132 23.4618 20.7187V20.681C23.4492 18.7436 22.7195 17.171 21.386 15.7872ZM13.2715 10.3775C13.2715 8.5785 14.6806 7.10658 16.3915 7.10658C18.1025 7.10658 19.5115 8.5785 19.5115 10.3775C19.5115 12.1765 18.1025 13.6485 16.3915 13.6485C14.6806 13.6485 13.2715 12.1765 13.2715 10.3775ZM22.0653 20.6936C22.0653 21.0332 21.8011 21.31 21.474 21.31H11.6864C11.4725 21.31 11.1454 21.222 10.9819 21.0584C10.8183 20.8823 10.7303 20.6558 10.7428 20.4042V20.3539C10.9064 17.2213 13.3973 15.0197 16.4041 15.0197C17.9138 15.0197 19.3354 15.6362 20.4047 16.7433C21.474 17.8629 22.0653 19.0958 22.0653 20.6936Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Leave Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "leave_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "leave_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/leave_category`}
                                                        method="get"
                                                    >
                                                        {t("Leave Category")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/leave_application`}
                                                        method="get"
                                                    >
                                                        {t("Leave Application")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/leave_application/leave-acknowledge`}
                                                        method="get"
                                                    >
                                                        {t("Leave Acknowledge")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/leave_application/leave-report-to`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/leave_application/leave-report-to`}
                                                    >
                                                        {t("Leave Recommend")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/leave_application/requested-user`}
                                                        method="get"
                                                    >
                                                        {t("Leave Approval")}
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/public_holiday`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/public_holiday`}
                                                    >
                                                        {t("Public Holiday")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/leave_application/direct-leave-approve`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/leave_application/direct-leave-approve`}
                                                    >
                                                        {t(
                                                            "Leave approved by HR"
                                                        )}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "shift_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("shift_management")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_1991)">
                                                        <path
                                                            d="M9.68846 8.56464C9.58843 8.32559 9.34793 8.17242 9.11823 8.07816L7.56576 7.36342L6.81992 6.73442L5.62451 7.92344L6.12505 11.2698C6.12684 11.2815 6.12389 11.2934 6.11696 11.3029L5.58799 12.0267C5.57956 12.0383 5.56614 12.0452 5.55185 12.0452C5.53756 12.0452 5.52415 12.0383 5.51572 12.0267L4.9868 11.3029C4.97982 11.2934 4.97696 11.2815 4.97866 11.2698L5.47919 7.92344L4.28383 6.73438L3.53799 7.36342L1.98558 8.07816C1.75583 8.17242 1.48054 8.38769 1.41529 8.56464C1.41529 8.56464 -0.27208 12.5821 0.643152 12.5821H10.4607C11.3758 12.5821 9.68846 8.56464 9.68846 8.56464Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M5.55365 6.7118C7.14133 6.7118 8.32618 5.23248 8.35321 2.7517C8.3704 1.03023 7.55055 0 5.55365 0C3.55664 0 2.73665 1.03023 2.75418 2.7517C2.78107 5.23248 3.96587 6.7118 5.55365 6.7118Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M18.5867 15.9826C18.4867 15.7435 18.2461 15.5903 18.0165 15.4961L16.464 14.7813L15.7182 14.1523L14.5221 15.3421L15.0233 18.6935C15.0251 18.7051 15.0222 18.717 15.0153 18.7266L14.4863 19.4504C14.4779 19.4619 14.4645 19.4688 14.4501 19.4688C14.4359 19.4688 14.4225 19.4619 14.4141 19.4504L13.8852 18.7266C13.8782 18.7171 13.8753 18.7052 13.877 18.6935L14.3783 15.3421L13.1822 14.1523L12.4364 14.7813L10.884 15.4961C10.6542 15.5903 10.3895 15.8032 10.3137 15.9826C10.3137 15.9826 8.62636 20.0001 9.54159 20.0001H19.3592C20.274 20 18.5867 15.9826 18.5867 15.9826Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M11.6526 10.1697C11.6796 12.6505 12.8644 14.1298 14.4521 14.1298C16.0398 14.1298 17.2246 12.6505 17.2517 10.1697C17.2689 8.4482 16.449 7.41797 14.4521 7.41797C12.4551 7.41802 11.635 8.44825 11.6526 10.1697Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M7.86816 18.5804C5.85842 18.5804 4.05131 17.4233 3.19701 15.6456L3.64402 15.5598C3.75747 15.538 3.85062 15.4575 3.8885 15.3483C3.92633 15.2392 3.90313 15.1183 3.82751 15.0308L2.50688 13.5044C2.44488 13.4327 2.35531 13.3926 2.2625 13.3926C2.24225 13.3926 2.22186 13.3945 2.20152 13.3983C2.08817 13.4201 1.99492 13.5007 1.95704 13.6098L1.2952 15.5168C1.25736 15.626 1.28057 15.7469 1.35618 15.8343C1.43175 15.9217 1.5483 15.9621 1.6615 15.9402L2.2174 15.8336C3.18219 18.075 5.39606 19.5501 7.86816 19.5501C8.13594 19.5501 8.35305 19.3331 8.35305 19.0652C8.353 18.7975 8.13594 18.5804 7.86816 18.5804Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M9.75452 1.54688C11.7643 1.54688 13.5713 2.70392 14.4257 4.48168L13.9786 4.56747C13.8652 4.58922 13.772 4.66978 13.7342 4.77891C13.6963 4.888 13.7195 5.009 13.7951 5.09639L15.1158 6.62284C15.1778 6.69453 15.2674 6.73459 15.3602 6.73459C15.3804 6.73459 15.4008 6.73275 15.4211 6.72883C15.5346 6.70708 15.6278 6.62643 15.6657 6.51734L16.3275 4.61044C16.3653 4.5013 16.3421 4.3803 16.2665 4.29296C16.1909 4.20557 16.0744 4.16512 15.9611 4.18697L15.4053 4.29369C14.4404 2.05225 12.2265 0.577148 9.75447 0.577148C9.48664 0.577148 9.26953 0.794161 9.26953 1.06204C9.26958 1.32981 9.48669 1.54688 9.75452 1.54688Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_1991">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Shift Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "shift_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>
                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "shift_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/shift`}
                                                        method="get"
                                                    >
                                                        {t("Manage Shift")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className={
                                                            url ===
                                                            `${base_url}/admin/duty_locations`
                                                                ? "active"
                                                                : ""
                                                        }
                                                        href={`${base_url}/admin/duty_locations`}
                                                    >
                                                        {t("Duty Locations")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "attendance_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu(
                                                    "attendance_management"
                                                )
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="21"
                                                    height="20"
                                                    viewBox="0 0 21 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M18.9706 10.6653V3.87413C18.9706 3.47949 18.8139 3.10102 18.5348 2.82197C18.2558 2.54292 17.8773 2.38615 17.4827 2.38615H15.2209V3.09517C15.2209 3.19383 15.1817 3.28845 15.112 3.35821C15.0422 3.42798 14.9476 3.46717 14.8489 3.46717C14.7503 3.46717 14.6557 3.42798 14.5859 3.35821C14.5161 3.28845 14.4769 3.19383 14.4769 3.09517V2.38615H5.55539V3.10001C5.55539 3.19867 5.5162 3.29329 5.44644 3.36305C5.37668 3.43281 5.28206 3.472 5.1834 3.472C5.08474 3.472 4.99012 3.43281 4.92036 3.36305C4.8506 3.29329 4.81141 3.19867 4.81141 3.10001V2.38615H2.60287C2.20824 2.38615 1.82976 2.54292 1.55071 2.82197C1.27166 3.10102 1.1149 3.47949 1.1149 3.87413V17.2659C1.1149 17.6606 1.27166 18.039 1.55071 18.3181C1.82976 18.5971 2.20824 18.7539 2.60287 18.7539H12.0244C12.1907 19.0165 12.3781 19.2635 12.5846 19.4938H2.58353C1.99158 19.4938 1.42387 19.2587 1.00529 18.8401C0.586716 18.4215 0.351563 17.8538 0.351562 17.2618V3.87004C0.351563 3.27808 0.586716 2.71037 1.00529 2.2918C1.42387 1.87322 1.99158 1.63807 2.58353 1.63807H4.81141V0.868041C4.81141 0.769382 4.8506 0.674764 4.92036 0.605002C4.99012 0.535239 5.08474 0.496047 5.1834 0.496047C5.28206 0.496047 5.37668 0.535239 5.44644 0.605002C5.5162 0.674764 5.55539 0.769382 5.55539 0.868041V1.63807H14.4769V0.863206C14.4769 0.764546 14.5161 0.669928 14.5859 0.600166C14.6557 0.530403 14.7503 0.491211 14.8489 0.491211C14.9476 0.491211 15.0422 0.530403 15.112 0.600166C15.1817 0.669928 15.2209 0.764546 15.2209 0.863206V1.63807H17.4942C18.0861 1.63807 18.6539 1.87322 19.0724 2.2918C19.491 2.71037 19.7262 3.27808 19.7262 3.87004V11.0707C19.4852 10.9162 19.2326 10.7806 18.9706 10.6653Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M10.415 6.10645H17.1109C17.2095 6.10645 17.3041 6.14564 17.3739 6.2154C17.4437 6.28516 17.4829 6.37978 17.4829 6.47844C17.4829 6.5771 17.4437 6.67172 17.3739 6.74148C17.3041 6.81124 17.2095 6.85043 17.1109 6.85043H10.415C10.3163 6.85043 10.2217 6.81124 10.1519 6.74148C10.0822 6.67172 10.043 6.5771 10.043 6.47844C10.043 6.37978 10.0822 6.28516 10.1519 6.2154C10.2217 6.14564 10.3163 6.10645 10.415 6.10645ZM10.415 9.0824H17.1109C17.2095 9.0824 17.3041 9.12159 17.3739 9.19136C17.4437 9.26112 17.4829 9.35574 17.4829 9.4544C17.4829 9.55306 17.4437 9.64767 17.3739 9.71744C17.3041 9.7872 17.2095 9.82639 17.1109 9.82639H10.415C10.3163 9.82639 10.2217 9.7872 10.1519 9.71744C10.0822 9.64767 10.043 9.55306 10.043 9.4544C10.043 9.35574 10.0822 9.26112 10.1519 9.19136C10.2217 9.12159 10.3163 9.0824 10.415 9.0824Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M19.7779 14.1337V15.4743L18.6069 15.7143C18.5294 16.0103 18.4129 16.2948 18.2606 16.5602L18.922 17.5627L18.9201 17.5646L17.9805 18.5106L17.9786 18.5124L16.9828 17.8466C16.7207 17.9996 16.4393 18.1168 16.1462 18.1951L15.9081 19.374H14.5763L14.3383 18.1951C14.0452 18.1164 13.7639 17.9992 13.5017 17.8466L12.504 18.5124L11.5606 17.5627L12.2224 16.5602C12.0705 16.2945 11.9541 16.0102 11.876 15.7143L10.705 15.4743V14.1337L11.876 13.8941C11.953 13.5976 12.0701 13.313 12.2242 13.0482L11.5624 12.0457L12.5058 11.096L13.5017 11.7604C13.7638 11.6075 14.0452 11.4902 14.3383 11.4114L14.5763 10.2341H15.9085L16.1462 11.4133C16.4393 11.4918 16.7206 11.609 16.9828 11.7618L17.9786 11.096L17.9805 11.0975L18.9205 12.0438L18.9238 12.0457L18.2621 13.0482C18.4146 13.3134 18.531 13.598 18.6088 13.8941L19.7779 14.1337ZM15.2474 12.4084C13.9339 12.4069 12.8681 13.4775 12.8667 14.7996C12.8652 16.122 13.9287 17.1952 15.2418 17.1967C16.5554 17.1982 17.6211 16.1272 17.6226 14.8051C17.6241 13.4831 16.5606 12.4099 15.2474 12.4084ZM7.98237 14.3041C7.19895 15.0934 6.41404 15.8817 5.63248 16.6733C5.56738 16.7391 5.52943 16.7447 5.46694 16.6867L5.45355 16.674L5.45243 16.6729C5.16851 16.3847 4.88393 16.0972 4.5987 15.8103C4.33905 15.5487 4.07903 15.288 3.819 15.0268C3.79259 15.0001 3.76134 14.9781 3.74386 14.9632L3.75019 14.9569L3.73828 14.9446L4.2933 14.3855L4.3052 14.3978L4.30743 14.3959L5.52944 15.6269L7.53411 13.6077C7.69221 13.7673 7.83803 13.9138 7.98274 14.0608C8.05267 14.1318 8.08615 14.1575 8.08392 14.185L8.08839 14.1895L8.07983 14.1988C8.06867 14.2215 8.03705 14.249 7.98237 14.3041ZM5.43644 16.658C5.20171 16.4185 4.96549 16.1804 4.72927 15.9419C4.97079 16.1851 5.21185 16.4288 5.45243 16.6729C5.44722 16.6681 5.44202 16.664 5.43644 16.658ZM6.7652 7.50697L5.55138 8.72897L3.77622 6.94191L4.30036 6.41442L5.52981 7.6673L7.53746 5.64551L8.07165 6.1875C8.06235 6.20238 8.04784 6.21615 8.03296 6.2314C7.61009 6.65631 7.18751 7.0815 6.7652 7.50697ZM4.28363 9.8152L4.28809 9.81966C4.28511 9.81929 4.28251 9.81892 4.27953 9.81929L4.28363 9.8152ZM5.51046 11.6324L5.52162 11.6212L5.54915 11.6469L7.54416 9.63589L8.06123 10.1626C8.06086 10.1719 8.05937 10.182 8.05825 10.192L5.54171 12.7257L3.75577 10.9275L4.27953 10.4003H4.28809L5.51046 11.6324Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Attendance Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "attendance_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>
                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "attendance_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/my-attendance-report/${auth.id}`}
                                                        method="get"
                                                    >
                                                        {t("My Att. Report")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/all-or-department-wise/attendance-report`}
                                                        method="get"
                                                    >
                                                        {t("Attendance Report")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/manual-attendance`}
                                                        method="get"
                                                    >
                                                        {t("Manual Attendance")}
                                                    </Link>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <Link href={`${base_url}/admin/home-office-attendance`} method='get'>{t('Home Office Att.')}</Link>*/}
                                                {/*</li>*/}
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/manual-comment`}
                                                        method="get"
                                                    >
                                                        {t("Manual Comment")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "late_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("late_management")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_1986)">
                                                        <path
                                                            d="M12.8111 1.29644C13.2017 0.46832 14.1861 0.108944 15.0142 0.499569C15.8423 0.890194 16.2017 1.87457 15.8111 2.70269C15.4205 3.53082 14.4361 3.89019 13.608 3.49957C12.7798 3.10894 12.4361 2.12457 12.8111 1.29644ZM18.6392 7.39019H15.7642L15.0142 5.35894C14.7642 4.71832 14.2642 4.17144 13.5611 3.92144L13.2798 3.78082C12.6392 3.46832 11.9205 3.49957 11.3267 3.74957L8.59234 4.73394C8.40484 4.78082 8.24859 4.93707 8.15484 5.12457L6.71734 8.20269C6.56109 8.57769 6.70172 8.99957 7.06109 9.17144C7.43609 9.32769 7.85797 9.18707 8.02984 8.82769L9.34234 6.01519L10.9361 5.43707L7.18609 13.4371H3.73297C3.15484 13.4371 2.70172 13.8902 2.70172 14.4683C2.70172 15.0464 3.15484 15.4996 3.73297 15.4996H7.85797C8.26422 15.4996 8.60797 15.2496 8.79547 14.9058L10.108 12.0933L12.6548 19.1714C12.8423 19.7183 13.4517 19.9839 13.9673 19.7808C14.5142 19.5933 14.7798 18.9839 14.5767 18.4683L11.9205 11.1402L13.983 6.71832L14.5923 8.39019C14.7017 8.65582 14.9673 8.85894 15.2798 8.85894H18.6548C19.0455 8.85894 19.3736 8.53082 19.3736 8.14019C19.358 7.73394 19.0142 7.39019 18.6392 7.39019ZM5.46734 5.39019C6.68609 4.26519 6.76422 2.34332 5.63922 1.14019C4.51422 -0.0785554 2.60797 -0.156681 1.38922 0.968319C0.170468 2.09332 0.0923425 3.99957 1.21734 5.21832C2.34234 6.43707 4.23297 6.51519 5.46734 5.39019ZM1.68609 1.28082C2.73297 0.312069 4.34234 0.405819 5.31109 1.43707C6.27984 2.48394 6.18609 4.09332 5.15484 5.06207C4.10797 6.03082 2.49859 5.93707 1.54547 4.92144C0.576718 3.87457 0.654842 2.23394 1.68609 1.28082ZM3.57672 1.01519H3.26422V3.10894H1.95172V3.42144H3.57672V1.01519Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_1986">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Late Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "late_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>
                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "late_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/apply-list`}
                                                        method="get"
                                                    >
                                                        {t("Apply List")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/late-apply`}
                                                        method="get"
                                                    >
                                                        {t("Late Apply")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/late-list`}
                                                        method="get"
                                                    >
                                                        {t("Late list")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/custom-late-allow`}
                                                        method="get"
                                                    >
                                                        {t(
                                                            "Custom Late Allow "
                                                        )}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "roster_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("roster_management")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_1991)">
                                                        <path
                                                            d="M9.68846 8.56464C9.58843 8.32559 9.34793 8.17242 9.11823 8.07816L7.56576 7.36342L6.81992 6.73442L5.62451 7.92344L6.12505 11.2698C6.12684 11.2815 6.12389 11.2934 6.11696 11.3029L5.58799 12.0267C5.57956 12.0383 5.56614 12.0452 5.55185 12.0452C5.53756 12.0452 5.52415 12.0383 5.51572 12.0267L4.9868 11.3029C4.97982 11.2934 4.97696 11.2815 4.97866 11.2698L5.47919 7.92344L4.28383 6.73438L3.53799 7.36342L1.98558 8.07816C1.75583 8.17242 1.48054 8.38769 1.41529 8.56464C1.41529 8.56464 -0.27208 12.5821 0.643152 12.5821H10.4607C11.3758 12.5821 9.68846 8.56464 9.68846 8.56464Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M5.55365 6.7118C7.14133 6.7118 8.32618 5.23248 8.35321 2.7517C8.3704 1.03023 7.55055 0 5.55365 0C3.55664 0 2.73665 1.03023 2.75418 2.7517C2.78107 5.23248 3.96587 6.7118 5.55365 6.7118Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M18.5867 15.9826C18.4867 15.7435 18.2461 15.5903 18.0165 15.4961L16.464 14.7813L15.7182 14.1523L14.5221 15.3421L15.0233 18.6935C15.0251 18.7051 15.0222 18.717 15.0153 18.7266L14.4863 19.4504C14.4779 19.4619 14.4645 19.4688 14.4501 19.4688C14.4359 19.4688 14.4225 19.4619 14.4141 19.4504L13.8852 18.7266C13.8782 18.7171 13.8753 18.7052 13.877 18.6935L14.3783 15.3421L13.1822 14.1523L12.4364 14.7813L10.884 15.4961C10.6542 15.5903 10.3895 15.8032 10.3137 15.9826C10.3137 15.9826 8.62636 20.0001 9.54159 20.0001H19.3592C20.274 20 18.5867 15.9826 18.5867 15.9826Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M11.6526 10.1697C11.6796 12.6505 12.8644 14.1298 14.4521 14.1298C16.0398 14.1298 17.2246 12.6505 17.2517 10.1697C17.2689 8.4482 16.449 7.41797 14.4521 7.41797C12.4551 7.41802 11.635 8.44825 11.6526 10.1697Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M7.86816 18.5804C5.85842 18.5804 4.05131 17.4233 3.19701 15.6456L3.64402 15.5598C3.75747 15.538 3.85062 15.4575 3.8885 15.3483C3.92633 15.2392 3.90313 15.1183 3.82751 15.0308L2.50688 13.5044C2.44488 13.4327 2.35531 13.3926 2.2625 13.3926C2.24225 13.3926 2.22186 13.3945 2.20152 13.3983C2.08817 13.4201 1.99492 13.5007 1.95704 13.6098L1.2952 15.5168C1.25736 15.626 1.28057 15.7469 1.35618 15.8343C1.43175 15.9217 1.5483 15.9621 1.6615 15.9402L2.2174 15.8336C3.18219 18.075 5.39606 19.5501 7.86816 19.5501C8.13594 19.5501 8.35305 19.3331 8.35305 19.0652C8.353 18.7975 8.13594 18.5804 7.86816 18.5804Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M9.75452 1.54688C11.7643 1.54688 13.5713 2.70392 14.4257 4.48168L13.9786 4.56747C13.8652 4.58922 13.772 4.66978 13.7342 4.77891C13.6963 4.888 13.7195 5.009 13.7951 5.09639L15.1158 6.62284C15.1778 6.69453 15.2674 6.73459 15.3602 6.73459C15.3804 6.73459 15.4008 6.73275 15.4211 6.72883C15.5346 6.70708 15.6278 6.62643 15.6657 6.51734L16.3275 4.61044C16.3653 4.5013 16.3421 4.3803 16.2665 4.29296C16.1909 4.20557 16.0744 4.16512 15.9611 4.18697L15.4053 4.29369C14.4404 2.05225 12.2265 0.577148 9.75447 0.577148C9.48664 0.577148 9.26953 0.794161 9.26953 1.06204C9.26958 1.32981 9.48669 1.54688 9.75452 1.54688Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_1991">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Roster Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "roster_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>
                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "roster_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/roster`}
                                                        method="get"
                                                    >
                                                        {t("Roster Entry")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/roster/update`}
                                                        method="get"
                                                    >
                                                        {t("Roster Update")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/roster/approved`}
                                                        method="get"
                                                    >
                                                        {t("Approved Roster")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu === "users"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() => toggleMenu("users")}
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M10.114 1.87478C5.5445 1.81306 1.81404 5.54353 1.87575 10.1131C1.93669 14.4955 5.50505 18.0638 9.88747 18.1248C14.4578 18.1873 18.1875 14.4568 18.125 9.88728C18.0648 5.50408 14.4965 1.93572 10.114 1.87478ZM15.0523 14.658C15.0368 14.6748 15.0177 14.688 14.9965 14.6966C14.9752 14.7053 14.9524 14.7091 14.9295 14.7079C14.9066 14.7067 14.8842 14.7005 14.864 14.6897C14.8438 14.6789 14.8262 14.6638 14.8125 14.6455C14.4631 14.1883 14.0352 13.797 13.5488 13.4896C12.5543 12.8513 11.2941 12.4998 10.0008 12.4998C8.7074 12.4998 7.44724 12.8513 6.45271 13.4896C5.96633 13.7968 5.53845 14.1881 5.18904 14.6451C5.17531 14.6634 5.15771 14.6786 5.13749 14.6893C5.11728 14.7001 5.09493 14.7064 5.07204 14.7075C5.04916 14.7087 5.02629 14.7049 5.00505 14.6962C4.98382 14.6876 4.96475 14.6744 4.94919 14.6576C3.80297 13.4202 3.15368 11.8034 3.12575 10.117C3.06208 6.31579 6.18122 3.13415 9.98396 3.12478C13.7867 3.1154 16.8758 6.20329 16.8758 9.99978C16.8771 11.7269 16.2258 13.3907 15.0523 14.658Z"
                                                        fill="#888EA8"
                                                    />
                                                    <path
                                                        d="M9.99956 5.625C9.22925 5.625 8.53276 5.91367 8.03784 6.43828C7.54292 6.96289 7.29565 7.68828 7.35151 8.4668C7.4648 10 8.65269 11.25 9.99956 11.25C11.3464 11.25 12.532 10 12.6476 8.46719C12.7054 7.69609 12.4601 6.97734 11.957 6.44297C11.4601 5.91563 10.7648 5.625 9.99956 5.625Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Users")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu === "users"
                                                        ? "rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>

                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu === "users"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link to="/users/profile">
                                                        {t("Profile")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/users/user-account-settings">
                                                        {t("Account Settings")}
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link href="/admin/users">
                                                        {t("All Users")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/roles">
                                                        {t("Roles")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/permissions">
                                                        {t("Permissions")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/modules`}
                                                    >
                                                        {t("Modules")}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                    <li className="menu nav-item">
                                        <button
                                            type="button"
                                            className={`${
                                                currentMenu ===
                                                "report_management"
                                                    ? "active"
                                                    : ""
                                            } nav-link group w-full`}
                                            onClick={() =>
                                                toggleMenu("report_management")
                                            }
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4.04175 18.7503H1.54175V15.8328L4.04175 13.8215V18.7503ZM8.938 12.8128L7.6705 11.3353L6.438 12.3365V18.7503H8.938V12.8128ZM13.833 11.829L11.333 14.1603V18.7503H13.833V11.829ZM18.7292 7.42152L16.2292 9.78527V18.7503H18.7292V7.42152ZM18.4167 5.00027C18.638 4.73527 18.6017 4.34152 18.338 4.12027C18.073 3.90027 17.6805 3.93527 17.458 4.19902L10.8955 10.4328L7.64925 7.24402L1.5005 12.3003C1.22425 12.5078 1.168 12.899 1.37425 13.174C1.583 13.4503 1.973 13.5065 2.24925 13.3015L7.60675 8.91402L10.9155 12.189L18.4167 5.00027ZM19.7142 6.31527L19.7155 2.85777C19.7142 2.67527 19.6505 2.52402 19.5305 2.40152C19.4055 2.27902 19.2555 2.21902 19.0767 2.21777L15.6167 2.21902C15.4355 2.21777 15.2842 2.28152 15.1617 2.40152C15.038 2.52527 14.9755 2.67527 14.9742 2.85902C14.9755 3.04027 15.038 3.19027 15.1592 3.31277L18.618 6.77027C18.743 6.89527 18.893 6.95652 19.0717 6.95652C19.2542 6.95527 19.408 6.89402 19.528 6.77027C19.6505 6.64777 19.7142 6.49777 19.7142 6.31527Z"
                                                        fill="#888EA8"
                                                    />
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Report Management")}
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    currentMenu ===
                                                    "report_management"
                                                        ? "!rotate-90"
                                                        : "rtl:rotate-180"
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
                                        </button>
                                        <AnimateHeight
                                            duration={300}
                                            height={
                                                currentMenu ===
                                                "report_management"
                                                    ? "auto"
                                                    : 0
                                            }
                                        >
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/employee-attendance/date-range-wise`}
                                                        method="get"
                                                    >
                                                        {t("Emp. Attendance")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/department-attendance/date-range-wise`}
                                                        method="get"
                                                    >
                                                        {t("Dept. Attendance")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/all-emp-attendance/date-range-wise`}
                                                        method="get"
                                                    >
                                                        {t(
                                                            "All Emp. Attendance"
                                                        )}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/punch-details/date-range-wise`}
                                                        method="get"
                                                    >
                                                        {t(
                                                            "Punch Details Attendance"
                                                        )}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/late-flag-report`}
                                                        method="get"
                                                    >
                                                        {t("Late Flag Report")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/all-type-employee`}
                                                        method="get"
                                                    >
                                                        {t("Employee Report")}
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/emp-leave`}
                                                        method="get"
                                                    >
                                                        {t("Emp.Leave Report")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/all-or-dept-leave`}
                                                        method="get"
                                                    >
                                                        {t("Dept.Leave Report")}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`${base_url}/admin/employee-leave-details-month-year`}
                                                        method="get"
                                                    >
                                                        {t(
                                                            "M&Y Epm.Leave Report"
                                                        )}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            href={`${base_url}/admin/get-punch-details`}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_1959)">
                                                        <path
                                                            d="M16.5854 0C18.4878 0 20 1.5122 20 3.41463V16.5854C20 18.4878 18.4878 20 16.5854 20H3.41463C1.5122 20 0 18.4878 0 16.5854V3.41463C0 1.5122 1.5122 0 3.41463 0H16.5854ZM9.41463 6.29268C8.58537 6.29268 7.90244 6.92683 7.85366 7.7561V11.7073L7.70732 11.561L7.65854 11.5122C7.02439 10.9756 6.04878 11.0732 5.5122 11.6585L5.41463 11.7073L5.36585 11.7561C4.87805 12.3902 4.92683 13.3659 5.5122 13.9024L5.56098 13.9512L7.56098 15.6585H14.5854V11.7561C14.5854 11.2195 14.1951 10.7805 13.6585 10.7317H10.9268V7.80488C10.9756 6.97561 10.2927 6.29268 9.41463 6.29268ZM9.41463 7.31707C9.70732 7.31707 9.90244 7.51219 9.95122 7.80488V11.8049H13.561V15.7073H8.97561L7.7561 14.5366L6.2439 13.2683C6 13.0732 5.95122 12.7317 6.09756 12.4878L6.14634 12.439L6.19512 12.3902C6.39024 12.1463 6.73171 12.0976 6.97561 12.2439L7.02439 12.2927L7.07317 12.3415L8.92683 13.9512V7.85366C8.87805 7.56098 9.12195 7.31707 9.41463 7.31707ZM9.36585 4.29268C7.5122 4.29268 6 5.80488 6 7.65854C6 8.53659 6.34146 9.31707 6.92683 9.95122L7.02439 10.0488V7.7561C6.97561 6.92683 7.41463 6.09756 8.14634 5.65854C8.87805 5.21951 9.7561 5.17073 10.5366 5.60976C11.2683 6 11.7073 6.73171 11.7561 7.56098V10.0488C12.3902 9.41463 12.7805 8.53659 12.7317 7.65854C12.7317 5.80488 11.2195 4.29268 9.36585 4.29268Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_1959">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Get Punch Details")}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            href={`${base_url}/admin/get-date-wise-attendance`}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clip-path="url(#clip0_124_1988)">
                                                        <path
                                                            d="M14.4059 9.64334C14.3647 9.61209 14.1859 9.46521 14.2278 9.05709C14.2928 8.47084 14.3228 7.49646 14.3228 7.45521V7.44459C14.3228 4.65959 12.0603 2.39771 9.2747 2.39771C7.21282 2.39771 5.3272 3.68521 4.57345 5.61209C4.4897 5.84209 4.4172 6.10396 4.35345 6.34584C4.3222 6.47084 4.28032 6.61771 4.2597 6.68084C4.23697 6.73707 4.22571 6.79727 4.22658 6.85792C4.22745 6.91856 4.24044 6.97842 4.26478 7.03397C4.28912 7.08952 4.32432 7.13965 4.36831 7.1814C4.4123 7.22315 4.4642 7.25568 4.52095 7.27709C4.5772 7.30001 4.63748 7.31141 4.69822 7.31063C4.75896 7.30985 4.81892 7.2969 4.87457 7.27254C4.93022 7.24819 4.98041 7.21292 5.0222 7.16883C5.06398 7.12473 5.09649 7.07271 5.11782 7.01584C5.16032 6.91021 5.20095 6.76521 5.24407 6.57584C5.29595 6.36584 5.35845 6.12646 5.42157 5.94646C6.05032 4.37646 7.5997 3.31896 9.28595 3.31896C11.5578 3.31896 13.4109 5.17271 13.4109 7.44459C13.4109 7.53834 13.3809 8.43959 13.3159 8.97334C13.2478 9.64771 13.5103 10.0821 13.7866 10.3227C14.0866 10.1996 14.4003 10.1015 14.7247 10.0327C14.7153 9.94381 14.6801 9.8596 14.6235 9.79042C14.5668 9.72125 14.4912 9.67012 14.4059 9.64334ZM12.7628 8.62709C12.7834 8.34396 12.8141 8.03021 12.8041 7.43334C12.7722 5.49521 11.2016 3.92521 9.29532 3.92521C7.54657 3.92521 6.18532 5.10896 5.8197 6.95209C5.58845 8.03084 5.01282 8.07209 4.48907 8.02021C4.23845 7.99959 4.00782 8.17646 3.98657 8.42834C3.96595 8.67896 4.14345 8.90959 4.3947 8.93084C5.96595 9.08709 6.52032 8.03021 6.69907 7.11896C6.98157 5.70521 7.96595 4.82584 9.2747 4.82584C10.6897 4.82584 11.8509 5.99834 11.8734 7.43334C11.8834 7.98834 11.8509 8.27084 11.8303 8.53209C11.8091 8.74271 11.7884 8.96271 11.7884 9.28646C11.7797 10.1521 12.0434 10.7365 12.4003 11.1421C12.6407 10.9477 12.897 10.774 13.1666 10.6227C12.8872 10.349 12.7109 9.94771 12.7216 9.30771C12.7209 9.02521 12.7422 8.82646 12.7628 8.62709ZM10.8778 11.3496C10.7867 11.4305 10.7312 11.5441 10.7234 11.6658C10.7157 11.7874 10.7564 11.9072 10.8366 11.999C10.9616 12.1446 11.1047 12.2802 11.2534 12.409C11.4228 12.1515 11.6153 11.9108 11.8241 11.6858C11.7188 11.5943 11.6194 11.4962 11.5266 11.3921C11.4456 11.3014 11.3322 11.2461 11.2109 11.2381C11.0895 11.2302 10.9699 11.2702 10.8778 11.3496ZM16.6159 0.731462H14.9728C14.9479 0.731129 14.9231 0.735774 14.9 0.745126C14.8769 0.754478 14.8559 0.768349 14.8382 0.785926C14.8205 0.803503 14.8065 0.824433 14.797 0.847492C14.7875 0.87055 14.7827 0.895272 14.7828 0.920212V1.65271C14.7827 1.6776 14.7876 1.70225 14.7971 1.72524C14.8067 1.74823 14.8207 1.76908 14.8384 1.78659C14.8561 1.8041 14.8771 1.81792 14.9002 1.82723C14.9232 1.83654 14.9479 1.84117 14.9728 1.84084H16.6159C17.0141 1.84084 17.3484 2.17646 17.3484 2.57396V4.28084C17.3484 4.38584 17.4328 4.46959 17.5384 4.46959H18.2709C18.2958 4.46975 18.3205 4.46499 18.3436 4.45558C18.3666 4.44617 18.3876 4.43229 18.4052 4.41475C18.4229 4.3972 18.4369 4.37634 18.4465 4.35336C18.456 4.33038 18.4609 4.30573 18.4609 4.28084V2.56396C18.4603 1.55959 17.6322 0.731462 16.6159 0.731462ZM3.62032 17.9902H1.94532C1.75159 17.9878 1.5665 17.9096 1.42962 17.7725C1.29274 17.6354 1.21493 17.4502 1.21282 17.2565V15.6333C1.21307 15.6084 1.20835 15.5837 1.19892 15.5606C1.18949 15.5375 1.17555 15.5165 1.15791 15.4989C1.14028 15.4812 1.1193 15.4673 1.09621 15.4579C1.07312 15.4484 1.04839 15.4437 1.02345 15.444H0.290322C0.265436 15.4438 0.240765 15.4486 0.217748 15.458C0.194732 15.4675 0.17383 15.4815 0.156261 15.4991C0.138692 15.5167 0.124809 15.5377 0.115419 15.5607C0.10603 15.5838 0.101322 15.6085 0.101572 15.6333V17.2452C0.104037 17.7306 0.29798 18.1953 0.641243 18.5385C0.984505 18.8816 1.44934 19.0754 1.9347 19.0777H3.61095C3.63567 19.0778 3.66017 19.073 3.68304 19.0636C3.7059 19.0541 3.72667 19.0403 3.74416 19.0228C3.76164 19.0053 3.77549 18.9845 3.78492 18.9617C3.79434 18.9388 3.79915 18.9143 3.79907 18.8896V18.1558C3.79845 18.0621 3.71407 17.9902 3.62032 17.9902ZM9.92407 15.3708C10.0341 15.3708 10.1841 15.4127 10.3472 15.4708L10.3459 15.4402C10.3459 15.1265 10.3784 14.8208 10.4284 14.5215C10.2647 14.4719 10.0951 14.4442 9.92407 14.439C9.56782 14.439 8.97095 14.6071 8.01845 14.889C7.32657 15.0883 6.5522 15.3183 5.98595 15.4121C5.86527 15.4334 5.75795 15.5017 5.68745 15.602C5.61694 15.7022 5.58899 15.8263 5.6097 15.9471C5.63092 16.0676 5.69896 16.1748 5.79897 16.2453C5.89898 16.3158 6.02282 16.3439 6.14345 16.3233C6.76095 16.2202 7.5672 15.989 8.27907 15.7783C8.9397 15.5921 9.69407 15.3708 9.92407 15.3708ZM9.7147 16.0208C9.45345 16.0208 9.08657 16.104 8.49907 16.2515C8.07095 16.3558 7.58845 16.4708 7.24282 16.5121C7.1222 16.528 7.01275 16.5909 6.9383 16.6871C6.86385 16.7833 6.83043 16.9051 6.84532 17.0258C6.87657 17.2765 7.10657 17.4558 7.35782 17.4233C7.76595 17.3702 8.26907 17.2565 8.71907 17.1502C9.1172 17.0565 9.5572 16.9521 9.7247 16.9521C10.0566 16.9521 10.3391 17.059 10.6303 17.184C10.5158 16.8384 10.4358 16.4822 10.3916 16.1208C10.1717 16.0561 9.94388 16.0224 9.7147 16.0208ZM8.4272 13.224C7.33895 13.5855 6.23037 13.8827 5.1072 14.114C5.04788 14.1261 4.99154 14.1498 4.94146 14.1839C4.89137 14.2179 4.84853 14.2615 4.8154 14.3122C4.78228 14.3628 4.75952 14.4196 4.74846 14.4791C4.7374 14.5386 4.73824 14.5998 4.75095 14.659C4.80345 14.9096 5.0447 15.0677 5.29595 15.0158C6.81532 14.7008 7.91407 14.3546 8.7097 14.104C9.33782 13.9052 9.79845 13.7583 10.0709 13.7583C10.2241 13.7583 10.3897 13.8083 10.5709 13.8858C10.6572 13.5938 10.7678 13.3094 10.9016 13.0358C10.6291 12.9183 10.3584 12.8371 10.0603 12.8371C9.64157 12.8371 9.1597 12.994 8.4272 13.224ZM5.86157 13.2665C7.95532 12.7527 11.1291 11.9777 11.2766 7.43334C11.286 7.17636 11.2425 6.92019 11.1488 6.68074C11.055 6.44129 10.913 6.22369 10.7316 6.04146C10.5413 5.84752 10.3141 5.69381 10.0632 5.58948C9.81242 5.48514 9.54318 5.4323 9.27153 5.43411C8.99988 5.43592 8.73136 5.49233 8.48195 5.6C8.23254 5.70766 8.00732 5.86438 7.8197 6.06084C7.46282 6.44834 7.35907 6.96209 7.29595 7.32896C7.00282 8.85646 6.02907 9.60084 4.29032 9.62146C4.23027 9.62127 4.1708 9.63314 4.11542 9.65636C4.06004 9.67957 4.00988 9.71367 3.96792 9.75662C3.92596 9.79957 3.89304 9.85051 3.87112 9.90642C3.84921 9.96232 3.83873 10.0221 3.84032 10.0821C3.84032 10.3333 4.0497 10.5433 4.30095 10.5315C6.44845 10.5127 7.8297 9.43334 8.19595 7.49521C8.2597 7.13959 8.3322 6.85709 8.4897 6.67896C8.69907 6.45834 8.97095 6.33271 9.28595 6.33271C9.57845 6.33271 9.8722 6.45834 10.0709 6.66896C10.2591 6.86646 10.3647 7.11834 10.3534 7.39084C10.2284 11.2446 7.68345 11.8627 5.64157 12.3646C5.27847 12.4497 4.91846 12.5475 4.5622 12.6577C4.50502 12.6776 4.45233 12.7085 4.40715 12.7488C4.36198 12.7891 4.32521 12.8379 4.29896 12.8924C4.27271 12.947 4.25749 13.0062 4.25418 13.0666C4.25088 13.127 4.25955 13.1875 4.2797 13.2446C4.31096 13.3362 4.37017 13.4157 4.44899 13.4719C4.52782 13.528 4.62228 13.5581 4.71907 13.5577C4.77157 13.5577 4.81345 13.5471 4.86657 13.5371C5.13907 13.4446 5.4947 13.3602 5.86157 13.2665ZM3.62032 0.731462H1.94532C1.45996 0.733762 0.99513 0.927547 0.651868 1.27069C0.308605 1.61384 0.114662 2.0786 0.112197 2.56396V4.27146C0.112113 4.2963 0.116963 4.3209 0.126466 4.34384C0.135969 4.36679 0.149935 4.38761 0.167553 4.40512C0.185171 4.42262 0.206091 4.43645 0.229098 4.4458C0.252104 4.45515 0.276739 4.45984 0.301572 4.45959H1.0347C1.05937 4.45959 1.08381 4.45472 1.10659 4.44525C1.12938 4.43579 1.15008 4.42193 1.1675 4.40445C1.18492 4.38697 1.19872 4.36623 1.2081 4.34341C1.21749 4.32059 1.22228 4.29614 1.2222 4.27146V2.56396C1.2222 2.16646 1.55782 1.83146 1.95532 1.83146H3.63095C3.65576 1.83154 3.68034 1.82672 3.70328 1.81726C3.72621 1.80781 3.74705 1.79391 3.7646 1.77636C3.78214 1.75882 3.79604 1.73798 3.8055 1.71504C3.81495 1.6921 3.81978 1.66752 3.8197 1.64271V0.908962C3.79845 0.815212 3.71407 0.731462 3.62032 0.731462ZM4.55282 12.0621C4.6472 12.0408 4.74095 12.0208 4.83532 12.0108C6.61532 11.654 9.5997 11.0465 9.74657 7.43334C9.75086 7.31152 9.70727 7.19288 9.62514 7.10281C9.54302 7.01274 9.42889 6.95841 9.3072 6.95146C9.1853 6.94703 9.06654 6.99067 8.97652 7.07297C8.8865 7.15528 8.83242 7.26966 8.82595 7.39146C8.7097 10.2815 6.36407 10.7521 4.6472 11.099C4.55282 11.1183 4.44782 11.1402 4.3647 11.1608C4.3054 11.1729 4.24908 11.1966 4.199 11.2305C4.14892 11.2645 4.10607 11.308 4.07294 11.3587C4.03981 11.4093 4.01705 11.466 4.00598 11.5255C3.99491 11.585 3.99575 11.6461 4.00845 11.7052C4.02942 11.809 4.08573 11.9023 4.16779 11.9692C4.24985 12.0361 4.35257 12.0724 4.45845 12.0721C4.48907 12.0721 4.52032 12.0621 4.55282 12.0621Z"
                                                            fill="#888EA8"
                                                        />
                                                        <path
                                                            d="M19.7653 14.9066C19.7415 14.6054 19.6853 14.5785 19.3891 14.6029C19.0603 14.6285 18.7828 14.4648 18.6684 14.1785C18.5528 13.8866 18.6384 13.5841 18.8934 13.3741C19.0653 13.2329 19.0884 13.1185 18.9303 12.9523C18.6959 12.7035 18.4497 12.4648 18.1934 12.236C17.9953 12.0604 17.9028 12.0835 17.7353 12.2954C17.6401 12.4194 17.5048 12.5065 17.3526 12.542C17.2003 12.5774 17.0405 12.559 16.9003 12.4898C16.624 12.3604 16.4934 12.1223 16.5134 11.7829C16.5284 11.5498 16.4603 11.4698 16.2284 11.4516C16.0472 11.4366 15.8672 11.4285 15.6965 11.416C15.5184 11.4354 15.3509 11.4498 15.1865 11.4716C14.9565 11.5035 14.9053 11.5704 14.9266 11.8073C14.9566 12.1654 14.8084 12.436 14.5097 12.5579C14.2215 12.6779 13.9234 12.5923 13.6953 12.3248C13.5597 12.1654 13.4434 12.1429 13.2953 12.2835C13.0428 12.5166 12.8028 12.7604 12.5728 13.0154C12.379 13.2354 12.4009 13.3091 12.6259 13.496C12.839 13.6748 12.9303 13.9016 12.8709 14.1785C12.8115 14.4535 12.634 14.6366 12.3565 14.7041C12.254 14.7266 12.1428 14.7116 12.034 14.7116C11.8884 14.7116 11.7959 14.7754 11.7772 14.9198C11.7191 15.3216 11.7261 15.7301 11.7978 16.1298C11.8222 16.2635 11.9059 16.3223 12.0641 16.3135C12.1466 16.3085 12.2315 16.2879 12.3122 16.2973C12.6022 16.3223 12.8378 16.526 12.9109 16.7973C12.9878 17.0616 12.8953 17.3385 12.6628 17.5254C12.4709 17.6785 12.4459 17.7873 12.6159 17.9648C12.8459 18.2104 13.0865 18.4491 13.3415 18.6723C13.5565 18.8629 13.6384 18.8398 13.8184 18.611C13.9434 18.4473 14.1403 18.3429 14.3603 18.3429C14.5328 18.3429 14.6903 18.4079 14.8122 18.5123C15.014 18.6854 15.0678 18.9048 15.0403 19.161C15.0222 19.3491 15.0915 19.4591 15.2553 19.4604C15.6272 19.4698 16.0003 19.4716 16.3703 19.4473C16.6122 19.4341 16.6597 19.3479 16.6328 19.1041C16.5928 18.7516 16.7415 18.4729 17.0378 18.3473C17.334 18.2223 17.6409 18.3073 17.8622 18.5816C17.9978 18.7504 18.1172 18.7748 18.2703 18.6273C18.5253 18.3841 18.774 18.1329 19.0072 17.8698C19.1778 17.6785 19.1534 17.5741 18.949 17.4204C18.8652 17.3606 18.7962 17.2823 18.7475 17.1916C18.6987 17.1009 18.6715 17.0002 18.6678 16.8973C18.6447 16.4723 18.999 16.1429 19.439 16.186C19.664 16.2079 19.7753 16.1441 19.7791 15.9479C19.7934 15.5902 19.788 15.2319 19.7628 14.8748L19.7653 14.9066ZM15.769 17.1948C14.8022 17.1841 14.0259 16.3979 14.0391 15.4404C14.0503 14.496 14.8316 13.7191 15.7622 13.7235C16.7247 13.7266 17.5197 14.5179 17.5097 15.4666C17.5003 16.4266 16.7153 17.206 15.769 17.1948Z"
                                                            fill="#888EA8"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_124_1988">
                                                            <rect
                                                                width="20"
                                                                height="20"
                                                                fill="white"
                                                            />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {t("Get Attendance")}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
