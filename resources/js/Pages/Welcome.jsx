import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center bg-body-dark selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center text-white items-center lg:col-start-2">
                                <svg 
                                className="h-20 w-auto text-white lg:h-24 lg:text-[#FF2D20]"
                                viewBox="0 0 500 670" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path style={{fill: 'red'}} d="M 390.1 348.401 C 390.1 348.401 388.141 340.651 388.141 341.113 L 307.015 303.586 L 247.313 333.401 L 247.313 200.47 C 247.313 200.007 247.245 199.557 247.107 199.118 C 247.066 198.965 246.958 198.834 246.902 198.681 C 246.779 198.408 246.684 198.123 246.52 197.875 C 246.41 197.71 246.247 197.568 246.11 197.414 C 245.932 197.211 245.782 196.988 245.578 196.809 C 245.4 196.655 245.182 196.549 244.99 196.417 C 244.771 196.264 244.58 196.097 244.334 195.98 L 172.692 160.206 C 170.848 159.281 168.582 159.281 166.737 160.206 L 95.095 195.98 C 94.851 196.097 94.659 196.276 94.439 196.417 C 94.248 196.549 94.031 196.655 93.852 196.809 C 93.648 196.988 93.497 197.211 93.32 197.414 C 93.182 197.568 93.018 197.71 92.91 197.875 C 92.746 198.123 92.637 198.408 92.528 198.681 C 92.459 198.824 92.364 198.965 92.322 199.118 C 92.186 199.557 92.118 200.007 92.118 200.47 L 92.118 413.289 C 92.118 415.137 93.266 416.854 95.109 417.777 L 238.407 489.326 C 238.72 489.481 239.062 489.575 239.39 489.681 C 239.54 489.729 239.69 489.812 239.855 489.848 C 240.359 489.967 240.866 490.026 241.385 490.026 C 241.902 490.026 242.408 489.967 242.913 489.848 C 243.05 489.812 243.174 489.742 243.311 489.706 C 243.665 489.6 244.019 489.492 244.347 489.338 L 387.645 417.79 C 389.504 416.867 390.637 415.16 390.637 413.301 L 390.1 348.401 Z M 241.275 407.331 L 181.68 378.083 L 244.267 346.835 L 312.931 312.553 L 372.581 342.333 L 328.816 363.999 L 241.275 407.331 Z M 200.695 356.655 L 175.616 369.175 L 175.616 239.24 L 210.255 221.945 L 235.333 209.425 L 235.333 339.348 L 200.695 356.655 Z M 169.646 170.677 L 229.324 200.481 L 169.646 230.284 L 109.97 200.481 L 169.646 170.677 Z M 103.961 209.425 L 129.038 221.945 L 163.678 239.24 L 163.678 378.118 L 163.678 378.131 L 163.678 378.144 C 163.678 378.345 163.746 378.534 163.773 378.724 C 163.815 378.972 163.815 379.234 163.897 379.481 L 163.897 379.493 C 163.965 379.695 164.088 379.883 164.183 380.073 C 164.293 380.287 164.36 380.524 164.498 380.726 C 164.498 380.726 164.498 380.737 164.511 380.737 C 164.633 380.915 164.811 381.069 164.961 381.235 C 165.125 381.425 165.263 381.613 165.453 381.78 L 165.467 381.791 C 165.631 381.934 165.85 382.04 166.042 382.171 C 166.259 382.312 166.449 382.479 166.683 382.597 C 166.697 382.597 166.697 382.597 166.71 382.609 C 166.724 382.609 166.724 382.621 166.737 382.621 L 235.361 416.298 L 235.361 475.869 L 103.961 410.292 L 103.961 209.425 Z M 378.618 410.292 L 247.259 475.881 L 247.259 416.298 L 344.538 368.133 L 378.618 351.265 L 378.618 410.292 Z"/>
                                </svg>
                                <span className="-ml-3 mt-2 text-red-500">
                                    ea
                                </span>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('courses.index')}
                                        className="rounded-md px-3 py-2 text-red-500 font-bold ring-1 ring-transparent transition hover:text-red-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-red-500 font-bold ring-1 ring-transparent transition hover:text-red-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-red-500 font-bold ring-1 ring-transparent transition hover:text-red-700 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 bg-body-dark">
                                <a
                                    href="https://laravel.com/docs"
                                    id="docs-card"
                                    style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                                        boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                                    }}
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-body-dark p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div
                                        id="screenshot-container"
                                        className="relative bg-body-dark flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            src="/images/dashboard.jpg"
                                            alt="Lea"
                                            className="h-full shadow-lg w-full flex-1 rounded-[10px] object-top object-cover drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden"
                                            onError={handleImageError}
                                        />
                                        <img
                                            src="/images/dashboard.jpg"
                                            alt="Lea"
                                            className="hidden shadow-lg h-full w-full flex-1 rounded-[10px] object-top object-cover drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                                        />
                                        {/* <div className="absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-white via-body-dark to-transparent dark:via-zinc-900 dark:to-zinc-900"></div> */}
                                    </div>

                                    <div className="relative flex items-center gap-6 lg:items-end">
                                        <div id="docs-card-content" className="flex items-start gap-6 lg:flex-col">
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                                <svg
                                                    className="size-5 sm:size-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fill="#FF2D20"
                                                        d="M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                                                    />
                                                    <path
                                                        fill="#FF2D20"
                                                        d="m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-xl font-semibold text-white dark:text-white">
                                                    Get Started Today!
                                                </h2>

                                                <p className="mt-4 text-white text-sm/relaxed">
                                                    Join a community of learners and teachers and start your educational journey with [Your LMS Name]. Whether you're a beginner or an expert, there's something here for everyone. Sign up today and take the first step towards achieving your goals.
                                                </p>
                                            </div>
                                        </div>

                                        <svg
                                            className="size-6 shrink-0 stroke-[#FF2D20]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                            />
                                        </svg>
                                    </div>
                                </a>

                                <a
                                    href="https://laracasts.com"
                                    style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                                        boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                                    }}
                                    className="flex items-start gap-4 rounded-lg shadow-sm bg-body-dark p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <svg
                                            className="size-5 sm:size-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <g fill="#FF2D20">
                                                <path d="M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" />
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-white dark:text-white">
                                            Unlock Your Learning/Teaching Potential
                                        </h2>

                                        <p className="mt-4 text-sm/relaxed text-white">
                                           At Lea, we believe in empowering learners and teachers with the tools and resources they need to succeed. Whether you're looking to master/teach a new skill, enhance/share your knowledge, or explore/convey new subjects, our platform is designed to make learning and teaching accessible, engaging, and effective.
                                        </p>
                                    </div>

                                    <svg
                                        className="size-6 shrink-0 self-center stroke-[#FF2D20]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </a>

                                <a
                                    href="https://laravel-news.com"
                                    style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                                        boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                                    }}
                                    className="flex items-start gap-4 rounded-lg bg-body-dark p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <svg
                                            className="size-5 sm:size-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <g fill="#FF2D20">
                                                <path d="M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" />
                                                <path d="M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" />
                                                <path d="M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" />
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-white dark:text-white">
                                            Comprehensive Courses, Interactive Learning Experience
                                        </h2>

                                        <p className="mt-4 text-white text-sm/relaxed">
                                        Explore a wide range of courses, each designed by industry experts to provide you with the most relevant and up-to-date information. Engage with lessons that include a mix of text, video, audio, and tests, all designed to cater to different learning styles.
                                        </p>
                                    </div>

                                    <svg
                                        className="size-6 shrink-0 self-center stroke-[#FF2D20]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                        />
                                    </svg>
                                </a>

                                <div 
                                    style={{border: "2px solid rgba(169, 150, 253, 0.5)",
                                        boxShadow: "0px 4px 5px 0px rgba(208, 195, 226, 0.13), 0px 1px 8px 0px rgba(208, 195, 226, 0.13), 0px 2px 4px -1px rgba(208, 195, 226, 0.13)"
                                    }}
                                    className="flex items-start gap-4 rounded-lg bg-body-dark p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">
                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16">
                                        <svg
                                            className="size-5 sm:size-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <g fill="#FF2D20">
                                                <path d="M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" />
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="pt-3 sm:pt-5">
                                        <h2 className="text-xl font-semibold text-white dark:text-white">
                                            User-Friendly Interface, Track Your Progress
                                        </h2>

                                        <p className="mt-4 text-white text-sm/relaxed">
                                            Navigate through courses with ease using our intuitive design. Our platform is built to be accessible for all users, regardless of technical expertise. Keep track of your learning journey with our progress tracking tools. Set goals, achieve milestones, and celebrate your success.                                      
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
