import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import NFt4 from "../assets/img/nfts/Nft4.png";
import avatar1 from "../assets/img/avatars/avatar1.png";
import avatar2 from "../assets/img/avatars/avatar2.png";
import avatar3 from "../assets/img/avatars/avatar3.png";
import { useTheme } from '../context/ThemeContext'; 

const CardList = ({ auth, course, lessons, currentPage, lastPage }) => {
    
    const [currentOrderedCourses, setOrderedCourses] = useState(lessons.data || []);

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

        const reorderedCourses = Array.from(currentOrderedCourses);
        const [movedCourses] = reorderedCourses.splice(source.index, 1);
        reorderedCourses.splice(destination.index, 0, movedCourses);

        // Send the reordered list to the backend to update the order
        router.post(route('courses.reorder'), 
        { order: reorderedCourses.map(lesson => lesson.id) }, {
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
    const filteredLinks = lessons.links.filter(link => 
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
      <div className="upcoming-events">
        <div className="flex mb-2 sm:mb-0 flex-col sm:flex-row justify-between">
            <h1 className="block">Lessons</h1>
            <Link className="flex items-center ml-2 mb-1" href={route('lessons.create', course.id)}>
                <svg className="h-8 w-8 text-indigo-500 hover:text-indigo-400"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
            </Link>
            <Link className="ml-auto mr-2 flex items-center" href={route('courses.index')}>
                <svg className="h-8 w-8 text-red-500 hover:text-indigo-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" /></svg>
            </Link>
            <div className="flex">
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                  <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="list-none p-0 flex flex-wrap"
                  >
                      {currentOrderedCourses.length ? currentOrderedCourses.map((lesson, index) => (
                          <Draggable key={lesson.id} draggableId={String(lesson.id)} index={index}>
                          {(provided) => (
                                  <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between border-b w-full lg:w-1/3 text-green-500 hover:text-green-600 font-bold"
                                  >
                                      <Card 
                                          key={index} 
                                          course={course}
                                          lesson={lesson} 
                                          bidders={[avatar1, avatar2, avatar3]}
                                          id={lesson.id}
                                          title={lesson.title}
                                          date={course.author.name}
                                          share={
                                            <button 
                                                className="share-btn"
                                            >
                                                <Link href={route('lessons.edit', [course.id, lesson.id])}>
                                                    <i class="fa-regular fa-pen-to-square"></i>                                            
                                                </Link>
                                            </button>
                                            }
                                            color={"red"}
                                            img={NFt4}
                                      />
                                  </li>
                              )}
                          </Draggable>
                      )) : (
                          <p className="px-4 sm:px-6 text-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                            No lessons yet...
                          </p>
                      )}
                      {provided.placeholder}
                  </ul>
              )}
          </Droppable>
      </DragDropContext>
      </div>
    );
  };
  
  const Card = ({ course, lesson, date, id, title, bidders, img, share }) => {
    const { theme } = useTheme();

    return (
      <div className="card event-card w-full text-white">
        <div className="event-header">
          <img src={img} alt="" />
          <p>{date}</p>
          <i className="bx bx-heart like-btn"></i>
        </div>
        <div className="event-content">
        <Link 
            href={route('courses.show', id)} 
            className={`${theme === "dark" ? "text-white" : "text-black"} hover:text-indigo-500 font-bold w-full`}
        >
          <h2>{title}</h2>
          </Link>
        </div>
        <div className="flex flex-row-reverse w-max px-2 md:mt-2 lg:mt-0 mb-4">
            <span className="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 dark:!border-navy-800 dark:bg-gray-800 dark:text-white">
              +5
            </span>
            {bidders.map((avt, key) => (
              <span
                key={key}
                className="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white dark:!border-navy-800"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={avt}
                  alt=""
                />
              </span>
            ))}
        </div>
        <div className="event-footer">
        <div className="btn-group flex justify-between w-full">
        <Link 
                href={route('lessons.show', [course.id, lesson.id])} 
                className="font-bold"
            >
              <button className="!font-bold">To Lesson</button>
            </Link>
            <div className="share ml-auto">
              {share}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CardList;
