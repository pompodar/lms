import React, {useState} from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import NFt4 from "../assets/img/nfts/Nft4.png";
import avatar1 from "../assets/img/avatars/avatar1.png";
import avatar2 from "../assets/img/avatars/avatar2.png";
import avatar3 from "../assets/img/avatars/avatar3.png";
import { useTheme } from '../context/ThemeContext'; 

const CardList = ({ auth, courses, currentPage, lastPage, links, users }) => {
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
      <div className="upcoming-events">
        <div className="flex mb-2 sm:mb-0 flex-col sm:flex-row justify-between">
            <h1 className="block">Courses</h1>
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
                      {courses.data.length ? currentOrderedCourses.map((course, index) => (
                          <Draggable key={course.id} draggableId={String(course.id)} index={index}>
                          {(provided) => (
                                  <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between border-b w-full lg:w-1/3 text-green-500 hover:text-green-600 font-bold"
                                  >
                                      <Card 
                                          key={index}  
                                          bidders={[avatar1, avatar2, avatar3]}
                                          id={course.id}
                                          title={course.title}
                                          date={course.author.name}
                                          share={ auth.user.id === course.user_id &&
                                            <button 
                                                onClick={() => openModal(course.id)}
                                                className="share-btn"
                                            >
                                              <i className="fa-solid fa-share"></i>
                                            </button>
                                            }
                                            color={"red"}
                                            img={NFt4}
                                      />
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
    );
  };
  
  const Card = ({ date, id, title, bidders, img, share }) => {
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
          {/* <p style={{ backgroundColor: color }}>{category}</p> */}
          <div className="btn-group">
          <Link 
                href={route('courses.show', id)} 
                className="font-bold"
            >
              <button className="!font-bold">To Course</button>
            </Link>
            <div className="share">
              {share}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CardList;
  