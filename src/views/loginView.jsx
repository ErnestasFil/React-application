import {useAuth} from '../context/authContext';
import {useState} from "react";

import Icons from "../assets/icons";
import simbukaImage from '../assets/simbuka.svg';

const LoginView = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const hardcodedCredentials = {
        username: 'test@test.com',
        password: 'test123456',
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === hardcodedCredentials.username && password === hardcodedCredentials.password) {
            login({email});
            window.location.href = '/data';
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt=""
                        src={simbukaImage}
                        className="mx-auto h-10 w-auto"
                    />
                    <div className="bg-white dark:bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center">
                            <div
                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                <Icons name="checkBadge" className="h-8 w-8 text-green-500" aria-hidden="true"/>
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <div className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                    Test account
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-200">
                                        <b>Email: </b> test@test.com
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-200">
                                        <b>Password: </b> test123456
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm">{error}</div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginView;
