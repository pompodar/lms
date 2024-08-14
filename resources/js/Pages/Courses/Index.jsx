import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ContentCourses from '@/Components/ContentCourses';
import { useTheme } from '../../context/ThemeContext';

const App = ({ auth }) => {
  const { courses, currentPage, lastPage, links, users } = usePage().props;

  const { theme } = useTheme();

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-green-500 leading-tight">Courses</h2>}
    >
      <Head title="Courses" />
      <div className={theme === 'dark' ? 'darkmode' : ''}>
        <ContentCourses
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
