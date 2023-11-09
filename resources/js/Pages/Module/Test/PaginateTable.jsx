import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import MainLayout from "../../Layout/Mainlayout.jsx";
import Add from "../TaskManagement/Add.jsx";
import DataTable from "./DataTable.jsx"
import PaginationControls from "./PaginationControls.jsx"

function PaginateTable() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);

    const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, totalPages: 1 });

    useEffect(() => {
        fetch(`/test-table-data?page=${page}&per_page=${pageLimit}&search=${searchTerm}`)
            .then(response => response.json())
            .then(responseData => {
                setData(responseData.data);
                setPaginationInfo(responseData);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [page, searchTerm,pageLimit]);


    const handleGoToPage = (pageNumber) => {
        setPage(pageNumber);
        if (pageNumber >= 0 && pageNumber < paginationInfo.totalPages) {
            // Here, you can update the page with the new page number
            gotoPage(pageNumber); // Assuming you have access to gotoPage
        }
    };
    return (
        <div className="App">
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap">
                <div className="cus-dt-container w-full">
                    <h5 className="font-semibold mb-5 text-lg dark:text-white-light">Header</h5>
                    <div className="cus-dt-header mb-5 flex justify-between items-center">
                        <div>
                            <span className="mr-2">Show</span>
                            <select
                                className="form-select w-fit text-white-dark"
                                value={pageLimit}
                                onChange={(e) => setPageLimit(parseInt(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="ml-2">Entries</span>
                        </div>
                        <input
                            className="cus-dt-search form-input"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </div>
                    <DataTable data={data} />
                    <PaginationControls paginationInfo={paginationInfo} setPage={setPage} handleGoToPage={handleGoToPage} />
                </div>
            </div>
        </div>
    );
}





PaginateTable.layout = (page) => (
    <MainLayout children={page} title="HR || Add Shift" />
);
export default PaginateTable;
