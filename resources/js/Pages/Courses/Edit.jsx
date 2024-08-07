import React, { useState } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({auth}) => {
    const { course } = usePage().props;
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.visit(route('courses.update', course.id), {
            method: 'put',
            data: {
              title,
              description
            },
          })
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit {course.title}</h2>}
        >
            <Head title="Edit {course.title}" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:px-6 py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-between">
                            <label className="mr-4 w-24 inline-block">Title</label>
                            <input className=" w-64" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="mt-4 flex flex-col justify-between">
                            <label className="mr-4 w-24 inline-block">Description</label>
                            <textarea className=" w-64" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <button type="submit">
                        <svg class="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        </button>
                    </form>
                </div>
                <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                    <Link href={route('courses.show', course.id)}>
                        <svg class="h-8 w-8 text-red-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" /></svg>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
