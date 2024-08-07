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
            <div className="max-w-7xl mx-auto py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <button type="submit">Update</button>
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
