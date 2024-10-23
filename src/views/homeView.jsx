const HomeView = () => {
    return (
        <div className='bg-white text-gray-900 dark:bg-gray-900 dark:text-white'>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
                        Technical Interview Assignment
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
                        The Platform team at Simbuka is involved with many projects across many different teams.
                        That’s why it is important for us to build software in a highly reusable manner, that could be
                        used
                        in many different scenarios. We value clean, simple-to-understand code, given the complex
                        business requirements we often entail.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
