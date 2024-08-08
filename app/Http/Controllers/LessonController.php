<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    public function show(Course $course, Lesson $lesson)
    {
        // Load the related parts of the lesson
        $lesson->load('texts', 'videos', 'audios', 'tests');

        return Inertia::render('Lessons/Show', [
            'course' => $course,
            'lesson' => $lesson,
            'texts' => $lesson->texts,
            'videos' => $lesson->videos,
            'audios' => $lesson->audios,
            'tests' => $lesson->tests,
        ]);
    }

    public function create($courseId)
    {
        $course = Course::findOrFail($courseId);
        return Inertia::render('Lessons/Create', ['courseId' => $courseId, 'course' => $course]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'courseId' => 'required',
            'title' => 'required|string|max:255',
            'texts.*.content' => 'nullable|string',
            'tests.*.questions' => 'nullable|string',
            'audios.*.url' => 'nullable|string',
            'videos.*.url' => 'nullable|string',
        ]);

        $lesson = Lesson::create(['title' => $request->title, 'course_id' => $request->courseId]);

        if ($request->has('texts')) {
            foreach ($request->texts as $text) {
                if (($text['content'])) {
                    $lesson->texts()->create($text);
                };
            }
        }

        if ($request->has('tests')) {
            foreach ($request->tests as $test) {
                if (($test['questions'])) {
                    $lesson->tests()->create($test);
                };
            }
        }

        if ($request->has('audios')) {
            foreach ($request->audios as $audio) {
                if ($audio['url']) {
                    $lesson->audios()->create($audio);
                };
            }
        }

        if ($request->has('videos')) {
            foreach ($request->videos as $video) {
                if ($video['url']) {
                    $lesson->videos()->create($video);
                };
            }
        }

        return redirect()->route('courses.show', $request->courseId)->with('success', 'Lesson created successfully.');
    }

    // Show the form for editing the specified lesson
    public function edit(Course $course, Lesson $lesson)
    {
        // Load the related parts of the lesson
        $lesson->load('texts', 'videos', 'audios', 'tests');

        return Inertia::render('Lessons/Edit', [
            'course' => $course,
            'lesson' => $lesson,
            'texts' => $lesson->texts,
            'videos' => $lesson->videos,
            'audios' => $lesson->audios,
            'tests' => $lesson->tests,
        ]);
    }

    public function update(Request $request, $courseId, Lesson $lesson)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'texts.*.content' => 'nullable|string',
            'tests.*.questions' => 'nullable|string',
            'audios.*.url' => 'nullable|string',
            'videos.*.url' => 'nullable|string',
        ]);

        $lesson->update(['title' => $request->title]);

        $lesson->texts()->delete();
        $lesson->tests()->delete();
        $lesson->audios()->delete();
        $lesson->videos()->delete();

        if ($request->has('texts')) {
            foreach ($request->texts as $text) {
                $lesson->texts()->create($text);
            }
        }

        if ($request->has('tests')) {
            foreach ($request->tests as $test) {
                $lesson->tests()->create($test);
            }
        }

        if ($request->has('audios')) {
            foreach ($request->audios as $audio) {
                $lesson->audios()->create($audio);
            }
        }

        if ($request->has('videos')) {
            foreach ($request->videos as $video) {
                $lesson->videos()->create($video);
            }
        }

        return redirect()->route('courses.show', $courseId)->with('success', 'Lesson updated successfully.');
    }

    public function destroy(Course $course, Lesson $lesson)
    {
        $lesson->delete();

        return redirect()->route('courses.show', $course->id)
                         ->with('success', 'Lesson deleted successfully.');
    }
}
