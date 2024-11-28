import React from 'react';
import { useTable, useSortBy } from 'react-table';

const NominationHistory = () => {
  const data = React.useMemo(
    () => [
      {
        name: 'John Doe',
        nominationStatus: 'Approved',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        email: 'johndoe@example.com',
        phoneNo: '123-456-7890',
      },
      {
        name: 'Jane Smith',
        nominationStatus: 'Pending',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        email: 'janesmith@example.com',
        phoneNo: '098-765-4321',
      },
      // Add more data as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Nomination Status',
        accessor: 'nominationStatus',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone No.',
        accessor: 'phoneNo',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Nomination History</h1>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NominationHistory;
