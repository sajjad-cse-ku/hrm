import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

function DataTable({ data }) {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
    } = useTable(
        {
            columns: columns,
            data: data,
            initialState: { pageIndex: 0, pageSize: 100 },
        },
        usePagination
    );

    return (
        <div>
            <table {...getTableProps()} className="table">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
