<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'user_id'];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function sharedUsers()
    {
        return $this->belongsToMany(User::class);
    }

    public function userOrders()
    {
        return $this->belongsToMany(User::class, 'course_user_order')->withPivot('position');
    }

}
