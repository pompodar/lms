import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({auth}) => {
    const { courses, currentPage, lastPage, links } = usePage().props;

    // Filter links to include only the required ones
    const filteredLinks = courses.links.filter(link => 
        (link.label && link.label.includes("Previous") && currentPage !== 1) ||
        (link.label && link.label.includes("Next") && currentPage !== lastPage) ||
        (link.label && link.label == currentPage) ||
        (link.label && link.label == lastPage && currentPage !== lastPage)
    );

    console.log(courses);

    // SVG icons
    const NextIcon = () => (
        <svg 
            className="h-4 w-4 text-indigo-500" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
    );

    const PreviousIcon = () => (
        <svg 
            className="h-4 w-4 text-indigo-500" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" />
        </svg>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Courses</h2>}
        >
            <Head title="Courses" />
            <div className="max-w-7xl mx-auto py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max">
                        <Link href={route('courses.create')} className="p-6 block text-gray-900 w-max">
                            <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </Link>
                    </div>
                        {courses.data.length ? courses.data.map(course => (
                            <ul className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <li key={course.id}>
                                    <Link href={route('courses.show', course.id)} className="p-6 block text-gray-900">{course.title} by {course.author.name} </Link>
                                </li>
                            </ul>
                        ))
                        :
                        <p className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">No courses yet</p>
                        }
                </div>
                {courses.data.length > 0 && 
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                            {/* Pagination links */}
                            <div className="flex justify-center mt-6 mb-4">
                                <nav aria-label="Page navigation">
                                    <ul className="flex space-x-2">
                                    {filteredLinks.map((link, index) => (
                                        <Link 
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 border rounded flex items-center justify-center ${
                                                link.active 
                                                    ? 'bg-blue-500 text-white' 
                                                    : 'bg-white text-blue-500 border-blue-500'
                                            } hover:bg-blue-100`}
                                        >
                                            {link.label.includes("Next") ? (
                                                <NextIcon />
                                            ) : link.label.includes("Previous") ? (
                                                <PreviousIcon />
                                            ) : (
                                                link.label
                                            )}
                                        </Link>
                                    ))}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>    
                </div>        
                }    
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
