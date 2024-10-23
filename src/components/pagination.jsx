import {useEffect, useState} from 'react';
import Icons from "../assets/icons";

const Pagination = ({totalItems, itemsPerPageOptions, currentPage, onPageChange, onItemsPerPageChange}) => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            onPageChange(1);
        }
    }, [totalItems, currentPage, totalPages, onPageChange]);

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = Number(e.target.value);
        setItemsPerPage(newItemsPerPage);
        onItemsPerPageChange(newItemsPerPage);
        onPageChange(1);
    };

    const getPaginationItems = () => {
        const paginationItems = [];
        const maxPagesToShow = 3;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
            if (currentPage <= halfMaxPagesToShow) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + halfMaxPagesToShow >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - halfMaxPagesToShow;
                endPage = currentPage + halfMaxPagesToShow;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationItems.push(i);
        }

        const itemsWithEllipsis = [];
        if (startPage > 1) {
            itemsWithEllipsis.push(1);
            if (startPage > 2) itemsWithEllipsis.push('...');
        }
        itemsWithEllipsis.push(...paginationItems);
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) itemsWithEllipsis.push('...');
            itemsWithEllipsis.push(totalPages);
        }

        return itemsWithEllipsis;
    };

    const paginationItems = getPaginationItems();

    return (
        <div
            className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-900 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:text-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === 1 && 'pointer-events-none'}`}
                >
                    Previous
                </a>
                <a
                    href="#"
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:text-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === totalPages && 'pointer-events-none'}`}
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-white">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span
                        className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span
                        className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="border border-gray-300 rounded-md py-1 dark:bg-gray-900 dark:text-white"
                    >
                        {itemsPerPageOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <a
                            href="#"
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:dark:bg-gray-700 focus:z-20 focus:outline-offset-0 ${currentPage === 1 && 'pointer-events-none'}`}
                        >
                            <span className="sr-only">Previous</span>
                            <Icons name="chevronLeft" className="h-5 w-5 dark:text-white" aria-hidden="true"/>
                        </a>
                        {paginationItems.map((item, index) => (
                            typeof item === 'number' ? (
                                <a
                                    key={index}
                                    href="#"
                                    onClick={() => onPageChange(item)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === item ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:dark:bg-gray-700'} focus:z-20 focus:outline-offset-0`}
                                >
                                    {item}
                                </a>
                            ) : (
                                <span key={index}
                                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 focus:z-20 hover:dark:bg-gray-700 focus:outline-offset-0">
                                    {item}
                                </span>
                            )
                        ))}
                        <a
                            href="#"
                            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:dark:bg-gray-700 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages && 'pointer-events-none'}`}
                        >
                            <span className="sr-only">Next</span>
                            <Icons name="chevronRight" className="h-5 w-5 dark:text-white" aria-hidden="true"/>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
