import React from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({auth}) => {
    const { courses } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Courses</h2>}
        >
            <Head title="Courses" />
            <div className="max-w-7xl mx-auto py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max">
                        <Link href={route('courses.create')} className="p-6 block text-gray-900 w-max">
                            <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </Link>
                    </div>
                    <ul className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    {courses.map(course => (
                        <li key={course.id}>
                            <Link href={route('courses.show', course.id)} className="p-6 block text-gray-900">{course.title} by {course.author.name} </Link>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
