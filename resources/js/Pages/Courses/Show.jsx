import React, { useState } from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmationModal from '@/Components/ConfirmationModal';

const Show = ({auth}) => {
    const { course, lessons } = usePage().props;

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
                    <ul className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg w-max p-4">
                        {lessons.data.map(lesson => (
                            <li key={lesson.id}>
                                <Link href={route('lessons.show', [course.id, lesson.id])}>{lesson.title}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                        {/* Pagination links */}
                        <div className="flex justify-center mt-6 mb-4">
                            <nav aria-label="Page navigation">
                                <ul className="flex space-x-2">
                                    {lessons.links.map((link, index) => (
                                        <li key={index}>
                                            <Link 
                                                href={link.url} 
                                                className={`px-4 py-2 border rounded ${
                                                    link.active 
                                                        ? 'bg-blue-500 text-white' 
                                                        : 'bg-white text-blue-500 border-blue-500'
                                                } hover:bg-blue-100`}
                                            >
                                                {link.label.replace(" &raquo;", "").replace("&laquo; ", "")}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

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
