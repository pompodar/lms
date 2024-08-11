import React, {useState} from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/SharingModal'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import NftCard from "@/Components/card/NftCard_redesigned";
import NFt4 from "../assets/img/nfts/Nft4.png";
import avatar1 from "../assets/img/avatars/avatar1.png";
import avatar2 from "../assets/img/avatars/avatar2.png";
import avatar3 from "../assets/img/avatars/avatar3.png";

const CardList = ({ auth, courses, currentPage, lastPage, links, users }) => {
    const [currentOrderedCourses, setOrderedCourses] = useState(courses.data);

    console.log(courses);
    

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
        <h1>Courses</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                  <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="list-none p-0 flex flex-wrap gap-2"
                  >
                      {courses.data.length ? currentOrderedCourses.map((course, index) => (
                          <Draggable key={course.id} draggableId={String(course.id)} index={index}>
                          {(provided) => (
                                  <li
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex justify-between border-b"
                                  >
                                      <Link 
                                          href={route('courses.show', course.id)} 
                                          className="text-green-500 hover:text-green-600 font-bold w-72 max-w-96"
                                      >
                                        <Card 
                                            key={index}  
                                            bidders={[avatar1, avatar2, avatar3]}
                                            title={course.title}
                                            date={course.author.name}
                                            location={ auth.user.id === course.user_id &&
                                              <button 
                                                  onClick={() => openModal(course.id)}
                                                  className="text-green-500 hover:text-green-600 hidden"
                                              >
                                                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                  </svg>
                                              </button>
                                              }
                                              color={"red"}
                                              img={NFt4}
                                        />
                                      </Link>
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
  
  const Card = ({ date, title, location, color, img }) => {
    return (
      <div className="card event-card w-full text-white">
        <div className="event-header">
          <img src={img} alt="" />
          <p>{date}</p>
          <i className="bx bx-heart like-btn"></i>
        </div>
        <div className="event-content">
          <h2>{title}</h2>
          <p>{location}</p>
        </div>
        <div className="event-footer">
          {/* <p style={{ backgroundColor: color }}>{category}</p> */}
          <div className="btn-group">
            <button>Buy Ticket</button>
            <div className="share">
              <button className="share-btn">
                <i className="fa-solid fa-share"></i>
              </button>
              <ul className="popup">
                <li>
                  <a href="#" style={{ color: 'rgb(79, 153, 213)' }}>
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: 'rgb(34, 173, 34)' }}>
                    <i className="bx bxl-whatsapp"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default CardList;
  