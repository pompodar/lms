import React, { useState } from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmationModal from '@/Components/ConfirmationModal';

const Show = ({auth}) => {
    const { course, lessons, currentPage, lastPage } = usePage().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    const openModal = (courseId) => {
        setCourseToDelete(courseId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCourseToDelete(null);
        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (courseToDelete) {
            router.delete(route('courses.destroy', courseToDelete), {
                onSuccess: () => {
                    setCourseToDelete(null);
                    setIsModalOpen(false);
                },
                onError: (errors) => {
                    // Optionally handle errors here
                }
            });
        }
    };

    // Filter links to include only the required ones
    const filteredLinks = lessons.links.filter(link => 
        (link.label.includes("Previous") && currentPage !== 1) ||
        (link.label && link.label.includes("Next") && currentPage !== lastPage) ||
        link.label == currentPage ||
        (link.label == lastPage && currentPage !== lastPage)
    );

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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Course: {course.title}</h2>}
        >
            <Head title="Course {course.title}" />
            <div className="max-w-7xl mx-auto py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                    <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                        <p>Desc: {course.description}</p>
                        <Link className="inline-block" href={route('courses.edit', course.id)}>
                            <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        </Link>
                        <Link className="inline-block" href={route('lessons.create', course.id)}>
                            <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </Link>
                        <div className="mt-2 inline-block">                            
                            <button 
                                onClick={() => openModal(course.id)}
                                className="text-red-500 hover:underline ml-4"
                            >
                                <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                        <h2>Lessons:</h2>
                    </div>
                    {lessons.data.length  > 0 ?
                    (
                        <ul className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg w-max p-4">
                        {lessons.data.map(lesson => (
                            <li key={lesson.id}>
                                <Link href={route('lessons.show', [course.id, lesson.id])}>{lesson.title}</Link>
                            </li>
                        ))}
                    </ul>
                    )
                    : 
                    <p className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">No lessons yet</p>
                    }
                    
                    <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                        {lessons.data.length > 0 && 
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
                        }
                        <Link clssName="" href={route('courses.index')}>
                            <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this course? This action cannot be undone."
            />
        </AuthenticatedLayout>
    );
};

export default Show;
