<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['lesson_id', 'url'];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}

