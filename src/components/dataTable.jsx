import React, {useState} from 'react';
import Pagination from "./pagination";
import FilterData from "../context/filterData.js";
import SortData from "../context/sortData.js";

const DataTable = ({data, handleOpen, searchTerm, filters, sortConfig}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const filteredAndSortedData = React.useMemo(() => {
        let result = [...data];
        if (searchTerm) {
            result = result.filter((item) =>
                item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        result = new FilterData().filter(result, filters);
        result = new SortData().sort(result, sortConfig);
        return result;
    }, [data, searchTerm, filters, sortConfig]);

    const totalItems = filteredAndSortedData.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

    const highlightText = (text, search) => {
        if (!search) return text;
        const parts = text.split(new RegExp(`(${search})`, 'gi'));
        return parts.map((part, index) => (
            <span
                key={index}
                style={
                    part.toLowerCase() === search.toLowerCase()
                        ? {backgroundColor: 'lightblue'}
                        : {}
                }
            >
                {part}
            </span>
        ));
    };


    return (
        <div className="lg:col-span-3">
            <div className="overflow-x-auto">
                <table className="min-w-full border-gray-300 dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="border border-slate-700 px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">First
                            Name
                        </th>
                        <th className="border border-slate-700 px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Last
                            Name
                        </th>
                        <th className="border border-slate-700 px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 w-40"></th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900">
                    {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="border border-slate-700 px-4 py-2 text-sm text-gray-900 dark:text-white">
                                    {highlightText(item.firstName, searchTerm)}
                                </td>
                                <td className="border border-slate-700 px-4 py-2 text-sm text-gray-900 dark:text-white">
                                    {highlightText(item.lastName, searchTerm)}
                                </td>
                                <td className="border border-slate-700 px-4 py-2 text-sm text-gray-900 dark:text-white text-center">
                                    <button
                                        onClick={() => handleOpen(item)}
                                        className="bg-indigo-600 text-white px-2 py-1 rounded"
                                    >
                                        More info
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3"
                                className="border border-slate-700 px-4 py-2 text-sm text-gray-900 dark:text-white text-center">
                                No info available
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <Pagination
                    totalItems={totalItems}
                    itemsPerPageOptions={[1, 2, 5, 10, 20, 50, 100]}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </div>
        </div>
    );
};

export default DataTable;
