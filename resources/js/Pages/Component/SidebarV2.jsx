import React, { useEffect, useState } from "react";
import { themeConfig } from "../Store/ThemeConfig";
import { Link, usePage } from "@inertiajs/react";
import AnimateHeight from "react-animate-height";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { menuItems } from "../Store/NavigationItems";


function SidebarV2({ handleToggleSidebar, isToggleSidebar }) {
    const { url, base_url, auth } = usePage().props;

    // const [isToggleSidebar, setIsToggleSidebar] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const [currentMenu, setCurrentMenu] = useState("");
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const [isClickSideArrow, setIsClickSideArrow] = useState(false);
    const semidark = themeConfig.semidark;
    const { t } = useTranslation();
    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? "" : value;
        });
    };
    useEffect(() => {
        let menuItems = sessionStorage.getItem("item");
        if (menuItems) {
            handleChangeCurrentMenu(menuItems);
        } else {
            handleChangeCurrentMenu("Dashboard");
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

    const handleChangeCurrentMenu = (menu) => {
        toggleMenu(menu);
        sessionStorage.setItem("item", menu);
    };

    const handleChangeNavigationToggle = () => {
        handleToggleSidebar();
        setIsClickSideArrow(!isClickSideArrow);
    };
    console.log(isToggleSidebar);
    return (
        <div className={semidark ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
                    semidark ? "text-white-dark" : ""
                }`}
            >
                <div className="bg-white dark:bg-black relative menu-hov">
                    {/* Side navigation bar header */}
                    <BrandHeader
                        handleClick={() => handleToggleSidebar()}
                        t={t}
                    />

                    {/* side navigation bar side arrow button */}
                    {window.innerWidth > 1023 && (
                        <SideArrowBar
                            // handleClick={handleToggleSidebar}
                            isToggleSidebar={isToggleSidebar}
                            semidark={semidark}
                            onClickBtn={handleToggleSidebar}
                        />
                    )}
                    {/* all main menu items */}

                    <PerfectScrollbar className="h-[calc(100vh-65px)] relative verticlescroll scrollwidth-0">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <div className="mt-2 mb-2"></div>
                            <li className="menu nav-item">
                                <Link
                                    href={`${base_url}/admin/dashboard`}
                                    className={`${
                                        currentMenu === "Dashboard"
                                            ? "active-link"
                                            : ""
                                    } group icon-btn`}
                                    media="get"
                                    onClick={() =>
                                        handleChangeCurrentMenu("Dashboard")
                                    }
                                >
                                    <div className="flex items-center">
                                        <i class="fa-regular fa-snowflake"></i>

                                        {
                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                {t("Dashboard")}
                                            </span>
                                        }
                                    </div>
                                </Link>
                            </li>
                            {menuItems.map((data) => {
                                return (
                                    <li key={data.id} className="menu nav-item">
                                        {data.items.length > 0 ? (
                                            // which menu have submenu
                                            <button
                                                type="button"
                                                className={`${
                                                    currentMenu === data.title
                                                        ? "active icon-btn"
                                                        : " icon-btn"
                                                } nav-link group w-full`}
                                                onClick={() => {
                                                    handleChangeCurrentMenu(
                                                        data.title
                                                    );
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    <>{data.svgIcon}</>

                                                    {
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
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
                                                    currentMenu === data.title
                                                        ? "active-link"
                                                        : ""
                                                } group icon-btn`}
                                                media="get"
                                                onClick={() =>
                                                    handleChangeCurrentMenu(
                                                        data.title
                                                    )
                                                }
                                            >
                                                <div className="flex items-center">
                                                    {data.svgIcon}

                                                    {
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                            {t(data.title)}
                                                        </span>
                                                    }
                                                </div>
                                            </Link>
                                        )}

                                        {data.items.length > 0 &&
                                            !isToggleSidebar && (
                                                // Submenu
                                                <AnimateHeight
                                                    duration={300}
                                                    height={
                                                        currentMenu ===
                                                        data.title
                                                            ? "auto"
                                                            : 0
                                                    }
                                                >
                                                    <ul className="sub-menu text-gray-500">
                                                        {data.items.map(
                                                            (item) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        <Link
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
                                                            }
                                                        )}
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
                className="side-btn bg-white dark:bg-black"
                onClick={() => {
                    onClickBtn();
                    // setIsToggleSidebar(!isToggleSidebar);
                }}
                style={isToggleSidebar ? { display: "flex" } : {}}
            >
                {!isToggleSidebar ? (
                    <ArrowLeft semidark={semidark} />
                ) : (
                    <ArrowRight semidark={semidark} />
                )}
            </div>
        );
    }
}

export default SidebarV2;

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
            <Link href="/" className="main-logo flex items-center shrink-0">
                <img
                    className="w-8 ml-[5px] flex-none"
                    src="/assets/images/logo.svg"
                    alt="logo"
                />
                <span className="text-xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                    {t("LUMINOUS HRM")}
                </span>
            </Link>
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
