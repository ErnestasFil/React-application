import {useState} from 'react';
import Icons from '../assets/icons'

const Filters = ({filters, setFilters}) => {
    const filtersOptions = [
        {
            id: 'gender',
            name: 'Gender',
            type: 'checkbox',
            options: [{value: 'female', label: 'Female'}, {value: 'male', label: 'Male', checked: true}],
        },
        {
            id: 'birthDate',
            name: 'Birth Date',
            type: 'date',
            options: [
                {id: 'from', label: 'From', type: 'date'},
                {id: 'until', label: 'Until', type: 'date'},
            ],
        },
    ];
    const renderFilterOptions = (section) => {
        return section.options.map((option) => (
            <div key={`${section.id}-${option.id || option.value}`} className="flex items-center">
                {option.type === 'date' ? (
                    <div className="flex flex-col">
                        <label htmlFor={`${section.id}-${option.id}`}
                               className="text-sm text-gray-600 dark:text-gray-300">
                            {option.label}
                        </label>
                        <input
                            id={`${section.id}-${option.id}`}
                            type="date"
                            value={filters[section.id][option.id] || ''}
                            onChange={(e) => {
                                const {value} = e.target;
                                setFilters((prevFilters) => ({
                                    ...prevFilters,
                                    [section.id]: {
                                        ...prevFilters[section.id],
                                        [option.id]: value,
                                    },
                                }));
                            }}
                            className="h-10 w-full rounded border border-gray-500 text-gray-600 focus:ring-indigo-500 px-2"
                        />
                    </div>
                ) : (
                    <>
                        <input
                            id={`filter-${section.id}-${option.value}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            checked={filters[section.id]?.includes(option.value) || false}
                            onChange={() => {
                                setFilters((prevFilters) => {
                                    const isChecked = prevFilters[section.id]?.includes(option.value);
                                    const newValues = isChecked
                                        ? prevFilters[section.id].filter((val) => val !== option.value)
                                        : [...(prevFilters[section.id] || []), option.value];
                                    return {
                                        ...prevFilters,
                                        [section.id]: newValues,
                                    };
                                });
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`filter-${section.id}-${option.value}`}
                               className="ml-3 text-sm text-gray-600 dark:text-gray-300">
                            {option.label}
                        </label>
                    </>
                )}
            </div>
        ));
    };

    return (
        <>
            {filtersOptions.map((section) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                    <div key={section.id} className="border-b border-gray-200 py-6">
                        <h3 className="-my-3 flow-root">
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    setIsOpen(!isOpen);
                                }}
                                className="group flex w-full items-center justify-between bg-white dark:bg-gray-900 py-3 text-sm text-gray-400 dark:text-white hover:text-gray-500"
                            >
                                <span className="font-medium text-gray-900 dark:text-white">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                    {isOpen ? (
                                        <Icons name="minus" className="h-5 w-5 dark:text-white" aria-hidden="true"/>
                                    ) : (
                                        <Icons name="plus" className="h-5 w-5 dark:text-white" aria-hidden="true"/>
                                    )}
                                </span>
                            </button>
                        </h3>
                        {isOpen && (
                            <div className="pt-6">
                                <div className="space-y-4">
                                    {renderFilterOptions(section)}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default Filters;
