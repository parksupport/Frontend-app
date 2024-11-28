import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

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
        Cell: ({ value }) => (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              value === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
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

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Nomination History</h1>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
                    key={column.id}
                  >
                    {column.render('Header')}
                    <span className="inline-block ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaSortDown aria-label="sorted descending" />
                        ) : (
                          <FaSortUp aria-label="sorted ascending" />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.length > 0 ? (
              rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        key={cell.column.id}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NominationHistory;
