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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Courses</h2>}
        >
            <Head title="Courses" />
            <h1>Create Lesson</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input required type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <h2>Texts</h2>
                {texts.map((text, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={text.content}
                            onChange={e => handleFieldChange(setTexts, texts, index, 'content', e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveField(setTexts, texts, index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAddField(setTexts, texts)}>Add Text</button>

                <h2>Tests</h2>
                {tests.map((test, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={test.questions}
                            onChange={e => handleFieldChange(setTests, tests, index, 'questions', e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveField(setTests, tests, index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAddField(setTests, tests)}>Add Test</button>

                <h2>Audios</h2>
                {audios.map((audio, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={audio.url}
                            onChange={e => handleFieldChange(setAudios, audios, index, 'url', e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveField(setAudios, audios, index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAddField(setAudios, audios)}>Add Audio</button>

                <h2>Videos</h2>
                {videos.map((video, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={video.url}
                            onChange={e => handleFieldChange(setVideos, videos, index, 'url', e.target.value)}
                        />
                        <button type="button" onClick={() => handleRemoveField(setVideos, videos, index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAddField(setVideos, videos)}>Add Video</button>

                <button type="submit">Create</button>
            </form>
            <Link href={route('courses.show', courseId)}>Back to Course</Link>
        </AuthenticatedLayout>
    );
};

export default Create;
