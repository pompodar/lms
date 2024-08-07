import React, { useState } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ courseId, auth }) => {
    const [title, setTitle] = useState('');
    const [texts, setTexts] = useState([{ content: '' }]);
    const [tests, setTests] = useState([{ questions: '' }]);
    const [audios, setAudios] = useState([{ url: '' }]);
    const [videos, setVideos] = useState([{ url: '' }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('lessons.store', courseId), { courseId, title, texts, tests, audios, videos });
    };

    const handleAddField = (setter, items) => {
        setter([...items, { content: '' }]);
    };

    const handleRemoveField = (setter, items, index) => {
        setter(items.filter((_, i) => i !== index));
    };

    const handleFieldChange = (setter, items, index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setter(newItems);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text--500 leading-tight">Create Lesson</h2>}
        >
            <Head title="Courses" />
            <div className="max-w-7xl mx-auto py-12">
                <div className="max-w-7xl px-4 sm:px-6 sm:px-6 lg:px-8">
                    <div className="px-4 sm:px-6 bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4 w-max p-4">
                    <form onSubmit={handleSubmit} className="">
                        <div className="flex flex-col mb-2">
                            <label className="text-indigo-500 font-bold">Title</label>
                            <input required className="shadow-sm sm:rounded-lg border-indigo-500" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <h2 className="text-indigo-500 font-bold">Texts</h2>
                        {texts.map((text, index) => (
                            <div className="flex justify-between" key={index}>
                                <textarea
                                    className="w-full mb-2 shadow-sm sm:rounded-lg border-indigo-500"                                
                                    onChange={e => handleFieldChange(setTexts, texts, index, 'content', e.target.value)}
                                >{text.content}</textarea>
                                <div className="flex flex-col">
                                    <button type="button" onClick={() => handleRemoveField(setTexts, texts, index)}>
                                        <svg className="mt-2 h-6 w-6 text-red-500 hover:text-red-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                    {index === (texts.length - 1) && 
                                        <button className="" type="button" onClick={() => handleAddField(setTexts, texts)}>
                                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                        {texts.length === 0 &&
                        <button className="inline w-full" type="button" onClick={() => handleAddField(setTexts, texts)}>
                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </button>
                        }
                        <h2 className="text-indigo-500 font-bold">Tests</h2>
                        {tests.map((test, index) => (
                            <div className="flex justify-between" key={index}>
                                <input
                                    className="w-full mb-2 shadow-sm sm:rounded-lg border-indigo-500"
                                    type="text"
                                    value={test.questions}
                                    onChange={e => handleFieldChange(setTests, tests, index, 'questions', e.target.value)}
                                />
                                <div className="flex flex-col">
                                    <button className="" type="button" onClick={() => handleRemoveField(setTests, tests, index)}>
                                        <svg className="h-6 w-6 text-red-500 hover:text-red-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                    {index === (tests.length - 1) && 
                                        <button className="inline w-full" type="button" onClick={() => handleAddField(setTests, tests)}>
                                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                        {tests.length === 0 &&
                        <button className="inline w-full" type="button" onClick={() => handleAddField(setTests, tests)}>
                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </button>
                        }
                        <h2 className="text-indigo-500 font-bold">Audios</h2>
                        {audios.map((audio, index) => (
                            <div className="flex justify-between" key={index}>
                                <input
                                    className="w-full mb-2 shadow-sm sm:rounded-lg border-indigo-500"
                                    type="text"
                                    value={audio.url}
                                    onChange={e => handleFieldChange(setAudios, audios, index, 'audios', e.target.value)}
                                />
                                <div className="flex flex-col">
                                    <button className="" type="button" onClick={() => handleRemoveField(setAudios, audios, index)}>
                                        <svg className="h-6 w-6 text-red-500 hover:text-red-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                    {index === (audios.length - 1) && 
                                        <button className="inline w-full" type="button" onClick={() => handleAddField(setaudios, audios)}>
                                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                        {audios.length === 0 &&
                        <button className="inline w-full" type="button" onClick={() => handleAddField(setaudios, audios)}>
                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </button>
                        }
                        <h2 className="text-indigo-500 font-bold">Videos</h2>
                        {videos.map((video, index) => (
                            <div className="flex justify-between" key={index}>
                                <input
                                    className="w-full mb-2 shadow-sm sm:rounded-lg border-indigo-500"
                                    type="text"
                                    value={video.url}
                                    onChange={e => handleFieldChange(setVideos, videos, index, 'videos', e.target.value)}
                                />
                                <div className="flex flex-col">
                                    <button className="" type="button" onClick={() => handleRemoveField(setVideos, videos, index)}>
                                        <svg className="h-6 w-6 text-red-500 hover:text-red-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                    {index === (videos.length - 1) && 
                                        <button className="inline w-full" type="button" onClick={() => handleAddField(setvideos, videos)}>
                                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                        {videos.length === 0 &&
                        <button className="inline w-full" type="button" onClick={() => handleAddField(setvideos, videos)}>
                            <svg className="h-6 w-6 text-green-500 hover:text-green-800" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <line x1="9" y1="14" x2="15" y2="14" /></svg>
                        </button>
                        }
                        <button type="submit">
                            <svg className="h-8 w-8 text-indigo-500 mt-2 hover:text-indigo-800"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                        </button>
                    </form>
                    </div>
                </div>
            </div>
            <Link href={route('courses.show', courseId)}>Back to Course</Link>
        </AuthenticatedLayout>
    );
};

export default Create;
