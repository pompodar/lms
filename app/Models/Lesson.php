<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'course_id', 'order'];

    public function texts()
    {
        return $this->hasMany(Text::class);
    }

    public function tests()
    {
        return $this->hasMany(Test::class);
    }

    public function audios()
    {
        return $this->hasMany(Audio::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class);
    }
}

