import React, { useState } from 'react';
import { usePage, Link, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmationModal from '@/Components/ConfirmationModal';

const Show = ({ auth }) => {
    const { course, lesson, texts, tests, audios, videos } = usePage().props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lessonToDelete, setLessonToDelete] = useState(null);

    const handleConfirmDelete = () => {
        if (lessonToDelete) {
            router.delete(route('lessons.destroy', [course.id, lessonToDelete]), {
                onSuccess: () => {
                    setLessonToDelete(null);
                    setIsModalOpen(false);
                },
                onError: (errors) => {
                    // Optionally handle errors here
                }
            });
        }
    };

    const openModal = (lessonId) => {
        setLessonToDelete(lessonId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setLessonToDelete(null);
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-green-500 leading-tight">{lesson.title}</h2>}
        >
            <Head title="Lesson" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 p-4">
                    <Link className="inline-block shadow-sm sm:rounded-lg" href={route('lessons.edit', [course.id, lesson.id])}>
                        <svg className="h-6 w-6 text-indigo-500 hover:text-indigo-800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                            <path d="M12 20h9" />  
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </Link>
                    <button onClick={() => openModal(lesson.id)} className="inline-block">
                        <svg className="h-6 w-6 text-red-500 hover:text-red-800" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <line x1="4" y1="7" x2="20" y2="7" />  
                            <line x1="10" y1="11" x2="10" y2="17" />  
                            <line x1="14" y1="11" x2="14" y2="17" />  
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                    <ul>
                        {texts && texts.map(text => (
                            <li className="text-green-500 mb-2 inline-block" key={text.id}>{text.content}</li>
                        ))}
                    </ul>
                    <ul>
                        {tests && tests.map(test => (
                            <li className="text-green-500 overflow-hidden shadow-sm sm:rounded-lg mb-2 inline-block" key={test.id}>{test.questions}</li>
                        ))}
                    </ul>
                    {/* <ul>
                        {audios && audios.map(audio => (
                            <li key={audio.id}>
                                <audio controls>
                                    <source src={audio.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </li>
                        ))}
                    </ul> */}
                    <ul className="w-full">
                        {videos && videos.map(video => (
                            <li className="w-full lg:w-6/12  aspect-video text-green-500 overflow-hidden shadow-sm sm:rounded-lg mb-2 inline-block" key={video.id}>
                                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: video.url.replace('width="560"', '').replace('height="315"', '') }} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 p-4  w-max">
                    <Link href={route('courses.show', course.id)}>
                        <svg className="h-8 w-8 text-red-500 hover:text-indigo-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" />
                        </svg>
                    </Link>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this lesson? This action cannot be undone."
            />
        </AuthenticatedLayout>
    );
};

export default Show;
