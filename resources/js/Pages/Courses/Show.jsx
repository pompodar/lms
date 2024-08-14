import React, { useState } from 'react';
import { usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ContentLessons from '@/Components/ContentLessons';
import { useTheme } from '../../context/ThemeContext';

const Show = ({ auth }) => {
    const { course, lessons, currentPage, lastPage, links } = usePage().props;

    const { theme } = useTheme();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);

    console.log(lessons);

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

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return; // dropped outside the list

        const reorderedLessons = Array.from(lessons.data);
        const [movedLesson] = reorderedLessons.splice(source.index, 1);
        reorderedLessons.splice(destination.index, 0, movedLesson);

        // Send the reordered list to the backend to update the order
        router.post(route('lessons.reorder', course.id), { lessons: reorderedLessons.map(lesson => lesson.id) }, {
            onSuccess: () => {
                // Handle success
            },
            onError: (errors) => {
                // Handle errors
            }
        });
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

    const sortedLessons = lessons.data.sort((a, b) => a.order - b.order);

    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={<h2 className="font-semibold text-xl text-green-500 leading-tight">{course.title}</h2>}
        // >
        //     <Head title={`Course ${course.title}`} />
        //     <div className="max-w-7xl mx-auto py-12">
        //         <h1 className="text-2xl py-4 px-2 text-green-500 font-bold">Course</h1>
        //         <div className="max-w-7xl mx-2">
        //             <div className="max-w-7xl px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
        //                 <p className="max-w-7xl text-green-500 font-bold">{course.description}</p>
        //                 {course.author.id === auth.user.id && 
        //                     <>
        //                         <Link className="inline-block" href={route('courses.edit', course.id)}>
        //                             <svg className="h-6 w-6 text-indigo-500 hover:text-indigo-800"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M12 20h9" />  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
        //                         </Link>
                            
        //                         <Link className="inline-block" href={route('lessons.create', course.id)}>
        //                             <svg className="h-6 w-6 text-indigo-500 hover:text-indigo-800"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
        //                         </Link>
        //                         <div className="mt-2 inline-block">                            
        //                             <button 
        //                                 onClick={() => openModal(course.id)}
        //                             >
        //                                 <svg className="h-6 w-6 text-red-500 hover:text-red-800"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        //                             </button>
        //                         </div>
        //                     </>
        //                 }
        //             </div>
                    
        //             {/* Drag and Drop */}
        //             <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
        //                 <h2 className="text-indigo-500 font-bold">Lessons:</h2>
        //                 {lessons.data.length > 0 ? (
        //                     <DragDropContext onDragEnd={handleDragEnd}>
        //                         <Droppable droppableId="droppable">
        //                             {(provided) => (
        //                                 <ul
        //                                     ref={provided.innerRef}
        //                                     {...provided.droppableProps}
        //                                     className="list-none p-0 flex flex-col"
        //                                 >
        //                                     {sortedLessons.map((lesson, index) => (
        //                                         <Draggable key={lesson.id} draggableId={String(lesson.id)} index={index}
        //                                         isDragDisabled={auth.user.id !== course.user_id}
        //                                         >
        //                                             {(provided) => (
        //                                                 <li
        //                                                     ref={provided.innerRef}
        //                                                     {...provided.draggableProps}
        //                                                     {...provided.dragHandleProps}
        //                                                     className="bg-white"
        //                                                     >                                                            
        //                                                     <Link className="text-orange-500 hover:text-orange-600 font-bold" href={route('lessons.show', [course.id, lesson.id])}>
        //                                                         {index + 1}. {lesson.title}
        //                                                     </Link>
        //                                                 </li>
        //                                             )}
        //                                         </Draggable>
        //                                     ))}
        //                                     {provided.placeholder}
        //                                 </ul>
        //                             )}
        //                         </Droppable>
        //                     </DragDropContext>
        //                 ) : (
        //                     <p className="text-indigo-500">No lessons yet</p>
        //                 )}
        //             </div>

        //             <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
        //                 {lessons.data.length > 0 && 
        //                 <div className="flex justify-center mt-6 mb-4">
        //                     <nav aria-label="Page navigation">
        //                         <ul className="flex space-x-2">
        //                             {filteredLinks.map((link, index) => (
        //                                 <Link 
        //                                     key={index}
        //                                     href={link.url || '#'}
        //                                     className={`px-4 py-2 border rounded flex items-center justify-center ${
        //                                         link.active 
        //                                             ? 'bg-blue-500 text-white' 
        //                                             : 'bg-white text-blue-500 border-blue-500'
        //                                     } hover:bg-blue-100`}
        //                                 >
        //                                     {link.label.includes("Next") ? (
        //                                         <NextIcon />
        //                                     ) : link.label.includes("Previous") ? (
        //                                         <PreviousIcon />
        //                                     ) : (
        //                                         link.label
        //                                     )}
        //                                 </Link>
        //                             ))}
        //                         </ul>
        //                     </nav>
        //                 </div>
        //                 }
        //                 <Link href={route('courses.index')}>
        //                     <svg className="h-8 w-8 text-red-500 hover:text-indigo-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" /></svg>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        //     <ConfirmationModal
        //         isOpen={isModalOpen}
        //         onClose={closeModal}
        //         onConfirm={handleConfirmDelete}
        //         message="Are you sure you want to delete this course? This action cannot be undone."
        //     />
        // </AuthenticatedLayout>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-green-500 leading-tight">Courses</h2>}
            >
            <Head title="Courses" />
            <div className={theme === 'dark' ? 'darkmode' : ''}>
                <ContentLessons
                    auth={auth}
                    course={course}
                    lessons={lessons}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    links={links}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
