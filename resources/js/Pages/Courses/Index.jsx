import React, { useState } from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '../../Components/SharingModal'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const Index = ({ auth }) => {
    const { courses, currentPage, lastPage, links, users } = usePage().props;

    const [currentOrderedCourses, setOrderedCourses] = useState(courses.data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const openModal = (courseId) => {
        setSelectedCourse(courseId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post(route('courses.share', selectedCourse), formData)
            .then(response => {
                // Handle success
                closeModal(); // Close modal on success
            })
            .catch(error => {
                // Handle error
            });
    };

    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return; // dropped outside the list

        const reorderedCourses = Array.from(courses.data);
        const [movedCourses] = reorderedCourses.splice(source.index, 1);
        reorderedCourses.splice(destination.index, 0, movedCourses);

        console.log(reorderedCourses);

        // Send the reordered list to the backend to update the order
        router.post(route('courses.reorder'), 
        { order: reorderedCourses.map(course => course.id) }, {
            onSuccess: () => {
                // Handle success
                setOrderedCourses(reorderedCourses);
            },
            onError: (errors) => {
                // Handle errors
            }
        });        
    };    

    // Filter links to include only the required ones
    const filteredLinks = courses.links.filter(link => 
        (link.label && link.label.includes("Previous") && currentPage !== 1) ||
        (link.label && link.label.includes("Next") && currentPage !== lastPage) ||
        (link.label && link.label == currentPage) ||
        (link.label && link.label == lastPage && currentPage !== lastPage)
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
            header={<h2 className="font-semibold text-xl text-green-500 leading-tight">Courses</h2>}
        >
            <Head title="Courses" />
            <div className="max-w-7xl mx-auto py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max">
                        <div className="flex">
                            <Link href={route('courses.create')} className="p-6 block text-gray-900 w-max">
                                <svg className="h-6 w-6 text-red-500 hover:text-red-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                                    <path stroke="none" d="M0 0h24v24H0z"/>  
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />  
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  
                                    <line x1="12" y1="11" x2="12" y2="17" />  
                                    <line x1="9" y1="14" x2="15" y2="14" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <ul
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="list-none p-0"
                                >
                                    {courses.data.length ? currentOrderedCourses.map((course, index) => (
                                        <Draggable key={course.id} draggableId={String(course.id)} index={index}>
                                        {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between p-4 border-b"
                                                >
                                                    <Link 
                                                        href={route('courses.show', course.id)} 
                                                        className="text-green-500 hover:text-green-600 font-bold"
                                                    >
                                                        {index + 1}. {course.title} {course.id} by <span className="text-orange-500">{course.author.name}</span>
                                                    </Link>
                                                    { auth.user.id === course.user_id &&
                                                    <button 
                                                        onClick={() => openModal(course.id)}
                                                        className="text-green-500 hover:text-green-600"
                                                    >
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                        </svg>
                                                    </button>
                                                    }
                                                </li>
                                            )}
                                        </Draggable>
                                    )) : (
                                        <p className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">No courses yet</p>
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>         
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
            
            {/* Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onSubmit={handleSubmit} 
                users={users} 
            />
        </AuthenticatedLayout>
    );
};

export default Index;
