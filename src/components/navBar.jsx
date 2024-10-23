import {useState} from 'react'
import {useTheme} from "./themeContext";
import {useAuth} from '../context/authContext';

import simbukaImage from '../assets/simbuka.svg';
import Icons from "../assets/icons";

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {darkMode, toggleDarkMode} = useTheme();
    const {isLoggedIn, logout} = useAuth();

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200">
            <nav aria-label="Global" className="mx-auto flex max-w-9xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <img
                            alt=""
                            src={simbukaImage}
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                    >
                        <Icons name="bars3" className="h-6 w-6 dark:text-white" aria-hidden="true"/>
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button
                        type="button"
                        className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7 dark:text-gray-100"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <Icons name="sun" className="h-5 w-5 dark:text-white" aria-hidden="true"/> :
                            <Icons name="moon" className="h-5 w-5 dark:text-white" aria-hidden="true"/>}
                    </button>

                    {!isLoggedIn ? (
                        <a href="/login" className="ml-5 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>) : (
                        <a href="/" onClick={() => logout()}
                           className="ml-5 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                            Log out <span aria-hidden="true">&rarr;</span>
                        </a>)
                    }

                </div>
            </nav>

            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-25"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div
                        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img alt="" src={simbukaImage} className="h-8 w-auto"/>
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-100"
                            >
                                <Icons name="xmark" className="h-6 w-6 dark:text-white" aria-hidden="true"/>
                            </button>
                        </div>

                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="py-6">
                                    <a
                                        href="#"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 hover:dark:bg-gray-500"
                                        onClick={toggleDarkMode}
                                    >
                                        {darkMode ? 'Light mode' : 'Dark mode'}
                                    </a>
                                    {!isLoggedIn ? (
                                        <a href="/login"
                                           className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 hover:dark:bg-gray-500">
                                            Log in <span aria-hidden="true">&rarr;</span>
                                        </a>) : (
                                        <a href="/" onClick={() => logout()}
                                           className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 hover:dark:bg-gray-500">
                                            Log out <span aria-hidden="true">&rarr;</span>
                                        </a>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
