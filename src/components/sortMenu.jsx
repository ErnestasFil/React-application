import {useState} from 'react';
import Icons from "../assets/icons";

const SortMenu = ({requestSort, selectedSortOption}) => {
    const [sortMenuOpen, setSortMenuOpen] = useState(false);
    const sortOptions = [
        {name: 'First name: A-Z', key: 'firstName', direction: 'asc'},
        {name: 'First name: Z-A', key: 'firstName', direction: 'desc'},
        {name: 'Last name: A-Z', key: 'lastName', direction: 'asc'},
        {name: 'Last name: Z-A', key: 'lastName', direction: 'desc'},
    ];
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setSortMenuOpen((prev) => !prev)}
                    className={`group inline-flex justify-center text-sm font-medium ${selectedSortOption ? "text-green-500" : "text-gray-700 hover:text-gray-900 dark:text-white"}`}
                >
                    Sort
                    <Icons name="chevronDown"
                           className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                           aria-hidden="true"/>
                </button>
            </div>
            {sortMenuOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 dark:ring-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <button
                                key={option.name}
                                onClick={() => {
                                    requestSort(option.key, option.direction, option);
                                    setSortMenuOpen(false);
                                }}
                                className={`block px-4 py-2 text-sm ${selectedSortOption?.name === option.name ? 'font-bold' : 'text-gray-500 dark:text-gray-300'}`}
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortMenu;