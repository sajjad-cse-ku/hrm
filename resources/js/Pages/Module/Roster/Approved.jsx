import React, { Fragment, useState } from "react";
import MainLayout from "../../Layout/Mainlayout";
import { Tab } from '@headlessui/react';
import "tippy.js/dist/tippy.css";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Component/FlashMessage";
import { useForm } from "react-hook-form";

function Index() {
    const {flash , weeks ,rosters,shifts,locations,roster_status,permissions } = usePage().props;
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    const currentYear = currentDate.getFullYear();
    const [tabs, setTabs] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toggleCode = (name) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };

    const initialRosterState = rosters.reduce((acc, user) => {
        acc[user.id] = {};
        Object.keys(weeks).forEach((weekNumber) => {
            acc[user.id][weekNumber] = {};
            Object.keys(weeks[weekNumber]).forEach((dayOfWeek) => {
                acc[user.id][weekNumber][weeks[weekNumber][dayOfWeek]] = user[`day_${weeks[weekNumber][dayOfWeek]}`]|| "";
            });
        });
        return acc;
    }, {});

    const [rosterState, setRosterState] = useState(initialRosterState);
    const [locationValue, setLocationValue] = useState({}); // Set the initial location value here
    const [selectedWeek, setSelectedWeek] = useState(1);


    const handleLocationChange = (userId, weekNumber, value) => {
        setLocationValue((prevLocationValues) => ({
            ...prevLocationValues,
            [userId]: {
                ...prevLocationValues[userId],
                [`weak-${weekNumber}`]: value,
            },
        }));
    };
    const handleSelectChange = (userId, weekNumber, dayOfWeek, value) => {
        setRosterState((prevState) => ({
            ...prevState,
            [userId]: {
                ...prevState[userId],
                [weekNumber]: {
                    ...prevState[userId]?.[weekNumber],
                    [weeks[weekNumber][dayOfWeek]]: value,
                },
            },
        }));
    };
    const getLocationValueKey = (userId, weekNumber) => {
        return `weak-${weekNumber}`;
    };


    // Initialize a state variable to keep track of the selected state of checkboxes
    const [selectedItems, setSelectedItems] = useState([]);
    const handleSelectAll = () => {
        const allUserIds = rosters.map((roster) => roster.user.id);

        if (selectedItems.length === allUserIds.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(allUserIds);
        }
    };

    // Function to handle individual checkbox clicks
    const handleCheckboxChange = (userId) => {
        const updatedSelectedItems = [...selectedItems];

        if (updatedSelectedItems.includes(userId)) {
            updatedSelectedItems.splice(updatedSelectedItems.indexOf(userId), 1);
        } else {
            updatedSelectedItems.push(userId);
        }

        setSelectedItems(updatedSelectedItems);
    };
    function onSubmit(data) {
        router.post("/admin/roster/approved-by-id", selectedItems);
    }

    return (
        <>
            <FlashMessage flash={flash} />

            {
                roster_status === false  ?
                    <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 ">

                        <ul className="flex space-x-2 rtl:space-x-reverse">
                            <li>
                                <Link href="#" className="text-2xl text-danger hover:underline">
                                    This month have no roster information
                                </Link>
                            </li>
                        </ul>
                    </div>:
                    <>
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
                                        Employee Roster for Year : {currentYear} , Month : {currentMonth}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {
                            permissions.includes('roster-approve') || permissions.includes('super-admin')  ? (

                                <div className="space-y-8 pt-5">
                                    <div className="grid grid-cols-1 lg:grid-cols-1">
                                        <div className="panel" id="line">
                                            <div className="mb-5">
                                                <Tab.Group>
                                                    <Tab.List className=" flex flex-wrap border-b border-white-light dark:border-[#191e3a] gap-6">
                                                        {Object.keys(weeks).map((weekNumber) => (
                                                            <Tab as={Fragment} key={weekNumber}>
                                                                {({ selected }) => (
                                                                    <button
                                                                        key={weekNumber} // Add a unique key for each button
                                                                        className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                                                        before:inline-block' relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                                                                        onClick={() => setSelectedWeek(weekNumber.replace("weak-", ""))}
                                                                    >
                                                                        Week - {weekNumber}
                                                                    </button>
                                                                )}
                                                            </Tab>
                                                        ))}
                                                    </Tab.List>
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        <Tab.Panels>
                                                            {Object.keys(weeks).map((weekNumber) => (
                                                                <Tab.Panel key={weekNumber}>
                                                                    <div className="grid xl:grid-cols-1 grid-cols-1">
                                                                        <div className="panel">
                                                                            <div className="table-responsive mb-5">
                                                                                <table>
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th>
                                                                                            <label className="inline-flex">
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    className="form-checkbox"
                                                                                                    checked={selectedItems.length === rosters.length}
                                                                                                    onChange={handleSelectAll}
                                                                                                />
                                                                                            </label>
                                                                                        </th>
                                                                                        <th>Name</th>
                                                                                        {Object.keys(weeks[weekNumber]).map((dayOfWeek) => (
                                                                                            <th key={dayOfWeek}>{dayOfWeek} - {weeks[weekNumber][dayOfWeek]}</th>
                                                                                        ))}
                                                                                        <th>Location</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                    {rosters.map((roster,idx) => (
                                                                                        <tr key={idx}>
                                                                                            <td>
                                                                                                <label className="inline-flex">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        className="form-checkbox"
                                                                                                        value={roster.user_id}
                                                                                                        checked={selectedItems.includes(roster.user_id)}
                                                                                                        onChange={() => handleCheckboxChange(roster.user_id)}
                                                                                                    />
                                                                                                </label>
                                                                                            </td>
                                                                                            <td>
                                                                                                {/*<input type="hidden" value={roster.user.id} {...register(`[${roster.user.id}].user_id`)}/>*/}
                                                                                                {roster?.user.first_name}  {roster?.user.last_name} -  {roster?.user.id}
                                                                                            </td>
                                                                                            {Object.keys(weeks[weekNumber]).map((dayOfWeek) => (

                                                                                                <td key={dayOfWeek}>
                                                                                                    <div>
                                                                                                        <select
                                                                                                            className="form-select text-white-dark"
                                                                                                            value={
                                                                                                                rosterState[roster.user.id]?.[weekNumber]?.[weeks[weekNumber][dayOfWeek]] ||
                                                                                                                roster[`day_${weeks[weekNumber][dayOfWeek]}`] ||
                                                                                                                ''
                                                                                                            }
                                                                                                            onChange={(e) =>
                                                                                                                handleSelectChange(
                                                                                                                    roster.user.id,
                                                                                                                    weekNumber,
                                                                                                                    dayOfWeek,
                                                                                                                    e.target.value
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <option value="">Select....</option>
                                                                                                            {shifts.map((item) => (
                                                                                                                <option
                                                                                                                    key={item.id}
                                                                                                                    value={item.id}
                                                                                                                >
                                                                                                                    {item.name}-{item.from_time}
                                                                                                                </option>
                                                                                                            ))}
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </td>
                                                                                            ))}

                                                                                            <td>
                                                                                                <div>
                                                                                                    <select
                                                                                                        className="form-select text-white-dark"
                                                                                                        value={locationValue[roster.user.id]?.[getLocationValueKey(roster.user.id, weekNumber)] || (roster[`loc_${weekNumber}`] ? roster[`loc_${weekNumber}`].id : '')}
                                                                                                        onChange={(e) => handleLocationChange(roster.user.id, weekNumber, e.target.value)} // Pass weekNumber to the handler
                                                                                                    >
                                                                                                        <option value="">Select....</option>
                                                                                                        {locations.map((item) => (
                                                                                                            <option key={item.id} value={item.id}>
                                                                                                                {item.location}
                                                                                                            </option>
                                                                                                        ))}
                                                                                                    </select>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Tab.Panel>
                                                            ))}
                                                        </Tab.Panels>
                                                        <div>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary mt-3 ml-auto"
                                                            >
                                                                Approved Roster
                                                            </button>
                                                        </div>
                                                    </form>
                                                </Tab.Group>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            ) : null
                        }
                    </>
            }

        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="HR || Roster Approved" />
);
export default Index;

