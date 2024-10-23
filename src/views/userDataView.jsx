import {useEffect, useState} from 'react';
import FetchData from "../context/fetchData";
import Filters from "../components/filters";
import DataModal from "../components/dataModal";
import Icons from "../assets/icons";
import DataTable from "../components/dataTable";
import SearchBar from "../components/searchBar";
import SortMenu from "../components/sortMenu";

const UserDataView = () => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [data, setData] = useState([]);
    const [sortConfig, setSortConfig] = useState({key: '', direction: ''});
    const [filters, setFilters] = useState({gender: ['female', 'male'], birthDate: {from: '', until: ''}});
    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchData = new FetchData();
    const CACHE_KEY = 'fetchedData';
    const CACHE_TIME_KEY = 'cacheFetchTime';
    const CACHE_DURATION = 10 * 60 * 1000;


    useEffect(() => {
        const getData = async () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cacheFetchTime = localStorage.getItem(CACHE_TIME_KEY);
            const isCacheValid = cacheFetchTime && (Date.now() - Number(cacheFetchTime)) < CACHE_DURATION;

            if (cachedData && cachedData !== "null" && isCacheValid) {
                setData(JSON.parse(cachedData));
            } else {
                const response = await fetchData.get("?page=0&size=1000");
                setData(response);
                localStorage.setItem(CACHE_KEY, JSON.stringify(response));
                localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
            }
        };

        getData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const requestSort = (key, direction, option) => {
        setSortConfig({key, direction});
        setSelectedSortOption(option);
    };

    const handleOpen = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
            <div>
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-40 flex">
                        <div
                            onClick={() => setMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear"
                        />
                        <div
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-gray-900 py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white dark:bg-gray-900 p-2 text-gray-400 dark:text-white"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <Icons name="xmark" className="h-6 w-6 dark:text-white" aria-hidden="true"/>
                                </button>
                            </div>

                            <form className="mt-4 border-t border-gray-200 px-4 py-6">
                                <Filters filters={filters} setFilters={setFilters}/>
                            </form>
                        </div>
                    </div>
                )}

                <main className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-end border-b border-gray-300 pb-6 pt-6">
                        <div className="flex justify-between">
                            <div className="flex items-center space-x-4 w-full">
                                <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
                                <SortMenu requestSort={requestSort} selectedSortOption={selectedSortOption}/>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <Icons name="funnel" className="h-5 w-5 dark:text-white" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="data-heading" className="pb-24 pt-6">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <form className="hidden lg:block">
                                <div className="space-y-4 border-b border-gray-200 pb-3">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
                                </div>
                                <Filters filters={filters} setFilters={setFilters}/>
                            </form>
                            <DataTable data={data} handleOpen={handleOpen} searchTerm={searchTerm} filters={filters}
                                       sortConfig={sortConfig}/>
                        </div>
                    </section>
                    <DataModal isOpen={isModalOpen} onClose={handleClose} item={selectedItem}/>
                </main>
            </div>
        </div>
    );
}
export default UserDataView;