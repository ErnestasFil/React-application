const DataModal = ({isOpen, onClose, item}) => {
    if (!isOpen) return null;

    const itemDetails = [
        {label: 'First Name', value: item.firstName},
        {label: 'Last Name', value: item.lastName},
        {label: 'Identification number', value: item.customerIdentificationCode},
        {label: 'Birth date', value: item.birthDate},
        {label: 'Gender', value: item.gender},
    ];

    return (
        <div onClick={onClose} className="relative z-10">
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-10 w-screen flex items-center justify-center">
                <div onClick={(e) => e.stopPropagation()}
                     className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Information about: {item.firstName} {item.lastName}
                            </h3>
                            <div className="mt-2">
                                <ul className="text-sm text-gray-500 dark:text-gray-200">
                                    {itemDetails.map((detail, index) => (
                                        <li key={index} className="flex justify-between py-1">
                                            <span>{detail.label}:</span>
                                            <span className="font-semibold">{detail.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-indigo-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-900 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataModal;
