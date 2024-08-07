<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $courses = Course::where('user_id', $user->id)->with('author')->get();
        return Inertia::render('Courses/Index', ['courses' => $courses]);
    }

    public function create()
    {
        $users = User::all();
        return Inertia::render('Courses/Create', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course = new Course($request->all());
        $course->user_id = $request->user()->id;
        $course->save();

        return redirect()->route('courses.index')->with('success', 'Course created successfully.');
    }


    public function show(Course $course, Request $request)
    {
        // Paginate lessons, default to 10 per page
        $lessons = $course->lessons()->paginate(10);

        // Load the author as well
        $course->load('author');

        // Pass lessons and course to Inertia
        return Inertia::render('Courses/Show', [
            'course' => $course,
            'lessons' => $lessons
        ]);
    }

    public function edit(Course $course)
    {
        $users = User::all();
        return Inertia::render('Courses/Edit', ['course' => $course, 'users' => $users]);
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $course->update($request->all());

        return redirect()->route('courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
