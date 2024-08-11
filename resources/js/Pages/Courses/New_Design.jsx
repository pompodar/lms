import React from 'react';
import { Link, usePage, Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '../../Components/SharingModal'; 
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Content from '@/Components/Content';
import { useTheme } from '../../context/ThemeComtext'; // Ensure the path is correct

const App = ({ auth }) => {
  const { courses, currentPage, lastPage, links, users } = usePage().props;

  const { theme, toggleTheme } = useTheme();

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-green-500 leading-tight">Courses</h2>}
    >
      <Head title="Courses" />
      <div className={theme === 'dark' ? 'darkmode' : ''}>
        <Content
            auth={auth}
            courses={courses}
            currentPage={currentPage}
            lastPage={lastPage}
            links={links}
            users={users}
          />
      </div>
    </AuthenticatedLayout>
  );
};

export default App;
