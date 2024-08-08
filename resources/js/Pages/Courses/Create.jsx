import React, { useState } from 'react';
import { Link, router, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({auth}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.visit(route('courses.store'), {
            method: 'post',
            data: {
              title,
              description
            },
          })
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Course</h2>}
        >
            <Head title="Create Course" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 sm:px-6 lg:px-8 mt-4">
                <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
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
                            <svg class="h-8 w-8 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </button>
                    </form>
                </div>
                <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                    <Link href={route('courses.index')}>
                        <svg class="h-8 w-8 text-red-500 hover:text-red-600"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M18 6v6a3 3 0 0 1 -3 3h-10l5 -5m0 10l-5 -5" /></svg>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
