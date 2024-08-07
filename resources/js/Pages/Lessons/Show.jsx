import React from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Show = ({auth}) => {
    const { course, lesson } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Courses</h2>}
        >
            <Head title="Courses" />
            <h1>{lesson.title}</h1>
            <h2>Texts</h2>
            <ul>
                {lesson.texts && lesson.texts.map(text => (
                    <li key={text.id}>{text.content}</li>
                ))}
            </ul>
            <h2>Tests</h2>
            <ul>
                {lesson.tests && lesson.tests.map(test => (
                    <li key={test.id}>{test.questions}</li>
                ))}
            </ul>
            <h2>Audios</h2>
            <ul>
                {lesson.audios && lesson.audios.map(audio => (
                    <li key={audio.id}><a href={audio.url}>{audio.url}</a></li>
                ))}
            </ul>
            <h2>Videos</h2>
            <ul>
                {lesson.videos && lesson.videos.map(video => (
                    <li key={video.id}><a href={video.url}>{video.url}</a></li>
                ))}
            </ul>
            <Link href={route('lessons.edit', [course.id, lesson.id])}>Edit</Link>
            <Link href={route('courses.show', course.id)}>Back to Course</Link>
        </AuthenticatedLayout>
    );
};

export default Show;
