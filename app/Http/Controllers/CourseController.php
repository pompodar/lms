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
    
        if (!$user) {
            return Inertia::render('Welcome');
        }
    
        // Retrieve courses for the user, including those shared with them
        $courses = Course::where('user_id', $user->id)
            ->orWhereHas('sharedUsers', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->with(['author', 'userOrders' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->get();
    
        // Apply the user's specific ordering
        $orderedCourses = $courses->sortBy(function ($course) use ($user) {
            $pivot = $course->userOrders->first()->pivot ?? null;
            return $pivot ? $pivot->position : $course->id;
        });
    
        // Paginate manually after sorting
        $perPage = 3;
        $pagedCourses = $orderedCourses->slice(($request->input('page', 1) - 1) * $perPage, $perPage)->values();
        $paginatedCourses = new \Illuminate\Pagination\LengthAwarePaginator($pagedCourses, $orderedCourses->count(), $perPage, $request->input('page', 1), ['path' => $request->url()]);
    
        $users = User::all();
    
        return Inertia::render('Courses/New_Design', [
            'courses' => $paginatedCourses,
            'currentPage' => $paginatedCourses->currentPage(),
            'lastPage' => $paginatedCourses->lastPage(),
            'links' => $paginatedCourses->links()->elements,
            'users' => $users,
        ]);
    }
    
    public function create(Request $request)
    {
        $user = $request->user();

        if (!$user) return Inertia::render('Welcome');

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
        $user = $request->user();

        if (!$user) return Inertia::render('Welcome');

        if ($course->user_id !== $user->id && !$course->sharedUsers->contains($user)) {
            abort(403, 'Unauthorized action.');
        }

        // Paginate lessons, default to 10 per page
        $lessons = $course->lessons()->paginate(10);

        // Load the author as well
        $course->load('author');

        // Pass lessons and course to Inertia
        return Inertia::render('Courses/Show', [
            'course' => $course,
            'lessons' => $lessons,
            'currentPage' => $lessons->currentPage(),
            'lastPage' => $lessons->lastPage(),
            'links' => $lessons->links()->elements,
        ]);
    }

    public function edit(Course $course, Request $request)
    {
        $user = $request->user();

        if (!$user) return Inertia::render('Welcome');

        if ($course->user_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $users = User::all();
        return Inertia::render('Courses/Edit', ['course' => $course, 'users' => $users]);
    }

    public function update(Request $request, Course $course)
    {
        $user = $request->user();

        if (!$user) return Inertia::render('Welcome');

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $course->update($request->all());

        return redirect()->route('courses.show', $course->id)->with('success', 'Course updated successfully.');
    }

    public function share(Request $request, Course $course)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $course->sharedUsers()->sync($request->user_ids);

        return redirect()->route('courses.index')->with('success', 'Course shared successfully.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'order' => 'required|array',
            'order.*' => 'exists:courses,id',
        ]);

        $user = $request->user();

        // Clear the existing pivot data for the user
        $user->courseOrders()->detach();

        // Re-attach the courses with the correct order
        foreach ($request->order as $index => $courseId) {
            $user->courseOrders()->attach($courseId, ['position' => $index + 1]);
        }

        return redirect()->route('courses.index')->with('success', 'Course shared successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
