import Icons from '../assets/icons';

const SearchBar = ({searchTerm, handleSearchChange}) => {
    return (
        <div className="relative mt-2 rounded-md shadow-sm w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icons name="magnifyingGlass" className="h-5 w-5 text-gray-400" aria-hidden="true"/>
            </div>
            <input
                id="search"
                name="search"
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-24 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
        </div>
    );
};

export default SearchBar;
